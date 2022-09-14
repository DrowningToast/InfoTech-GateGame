import express from "express";
import jsonwebtoken from "jsonwebtoken";
import ValidateJWT from "../helper/validateJWT";
import validateRole from "../helper/validateRole";
import DiscordUser from "../models/DiscordUser";
import User from "../models/User";

const discordRouter = express.Router();

/**
 * From: discord
 * @description Check if is the user already linked
 */
discordRouter.get("/:discordId", async (req, res) => {
  try {
    const user = await User.find({
      discordId: req.params.discordId,
    });
    if (user) return res.status(200).json(user);

    const discord = await DiscordUser.find({
      discordId: req.params.discordId,
    });

    return res.status(200).json(discord);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * From: discord
 * @description Check the current balance (tokens)
 */
discordRouter.get("/wallet/:discordId", async (req, res) => {
  try {
    const user = await User.findOne({
      discordId: req.params.discordId,
    }).select("balance discordId");

    const discord = await DiscordUser.findOne({
      discordId: req.params.discordId,
    }).select("balance discordId");

    return res.status(200).send(discord ?? user);
  } catch (e) {
    res.status(500).send(e);
  }
});

/**
 * From: discord
 * @description Create a new temporary account for users who haven't linked yet
 */
discordRouter.post<
  "/create",
  {},
  {},
  {
    jwt: string;
  }
>("/create", async (req, res) => {
  try {
    const { gate, discordId } = (await ValidateJWT(req.body.jwt)) as {
      gate: "AND" | "OR" | "NOR" | "NOT";
      discordId: string;
    };

    // Do not create a new temp account if one is already linked
    const user = await User.findOne({
      discordId: discordId,
    });

    if (user)
      return res.status(400).send("The user already has a firebase account");

    const discord = new DiscordUser({
      balance: 0,
      gate: gate,
      discordId: discordId,
    });

    await discord.save();

    return res.status(200).send(discord);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

/**
 * From: Web
 * @description Attempt to link the unlinked discord account
 * This will delete the temp discord document and fuse with the new one
 */
discordRouter.post<
  "/link",
  {},
  {},
  {
    uid: string;
    cred: string;
  }
>("/link", async (req, res) => {
  try {
    const firebaseAccount = await validateRole(req.currentUser);

    // Proving the ownership of both account
    if (!firebaseAccount.activated || firebaseAccount.uid !== req.body.uid)
      return res
        .status(401)
        .send("Failed to prove the ownership, or the user is not verified");

    // Token verification
    if (!process.env.BACKEND_TOKEN) throw new Error("MISSING BACKEND TOKEN");

    const payload = await jsonwebtoken.verify(
      req.body.cred,
      process.env.BACKEND_TOKEN,
      {
        algorithms: ["HS256"],
      }
    );

    const { sub, iat } = payload as {
      sub: string;
      iat: number;
    };

    // Find if the user is already linked or not
    const user = await User.findOne({
      $and: [
        {
          uid: req.body.uid!,
        },
        {
          discordId: sub,
        },
      ],
    });

    if (user) return res.status(400).send("The user is already linked");

    // Check if the firebase user exists or not
    if (
      !(await User.find({
        uid: req.body.uid,
      }))
    )
      return res
        .status(404)
        .send("The firebase account with the provided doesn't exist");

    const existingDiscordAccount = await DiscordUser.findOne({
      discordId: sub,
    });

    const response = await User.findOneAndUpdate(
      {
        uid: req.body.uid,
      },
      {
        discordId: sub,
        $inc: {
          balance: existingDiscordAccount?.balance ?? 0,
        },
      }
    );

    // Delete the discord account if it exists
    await DiscordUser.findOneAndDelete({
      discordId: sub,
    });

    return res.status(200).json(JSON.stringify(response));
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

/**
 * From: Web
 * @description Unlink the discord account from the KMITL account
 */
discordRouter.post<
  "/unlink",
  {},
  {},
  {
    uid: string;
  }
>("/unlink", async (req, res) => {
  try {
    const user = await validateRole(req.currentUser);

    if (user.uid !== req.body.uid)
      return res.status(401).send("Failed to prove ownership");

    const response = await User.findOneAndUpdate(
      {
        uid: req.body.uid,
      },
      {
        discordId: null,
      }
    );

    return res.status(200).json(JSON.stringify(response));
  } catch (e) {
    return res.status(500).send(e);
  }
});

/**
 * From: discord
 * @description Grant tokens to the users, For agencies only
 */
discordRouter.post<
  "/grant",
  {},
  {},
  {
    jwt: string;
  }
>("/grant", async (req, res) => {
  try {
    const { requesterDiscordId, discordId, amount } = (await ValidateJWT(
      req.body.jwt
    )) as {
      requesterDiscordId: string;
      discordId: string;
      amount: number;
    };

    console.log(`Incoming grant ${requesterDiscordId} ${discordId} ${amount}`);

    // Check the permission
    const requester = await User.findOne({
      discordId: requesterDiscordId,
    });

    // Check the required permission
    if (!requester)
      return res.status(400).send("The requester is not linked to any account");
    if (requester?.role !== "Agency")
      return res.status(401).send("Requester is missing permission");

    // Check if the complete account exists
    const targetFirebase = await User.findOne({
      discordId: discordId,
    });
    const discordUser = await DiscordUser.findOne({
      discordId: discordId,
    });

    if (targetFirebase) {
      return res.status(200).send(
        (await User.findOneAndUpdate(
          {
            discordId: discordId,
          },
          {
            $inc: {
              balance: amount,
            },
          }
        )) ?? undefined
      );
    } else if (discordUser) {
      return res.status(200).send(
        (await DiscordUser.findOneAndUpdate(
          {
            discordId: discordId,
          },
          {
            $inc: {
              balance: amount,
            },
          }
        )) ?? undefined
      );
    } else {
      return res.status(404).send("The target is not found");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

/**
 * From: Discord
 * @description Give tokens to other users, or even steal . . . / For players only
 */
discordRouter.post<
  "/give",
  {},
  {},
  {
    discordId: string;
    targetDiscordId: string;
    amount: number;
  }
>("/give", async (req, res) => {
  try {
    // Check if the firebase account exists or not
    const requesterFirebase = await User.findOne({
      discordId: req.body.discordId,
    });
    const requesterTemp = await DiscordUser.findOne({
      discordId: req.body.discordId,
    });
    if (!requesterFirebase || !requesterTemp)
      return res.status(404).send("Invalid giver source");

    let requester = { ...requesterFirebase, ...requesterTemp };
    // Check the balance for the giver, giving case
    if (req.body.amount > 0 && req.body.amount > requester.balance)
      return res.status(400).send("Insufficient account balance");

    // Validating target account
    const targetFirebase = await User.findOne({
      discordId: req.body.targetDiscordId,
    });
    const targetTemp = await DiscordUser.findOne({
      discordId: req.body.discordId,
    });
    let target = {
      ...targetFirebase,
      ...targetTemp,
    };
    // Check the balance for the target, stealing case
    if (
      req.body.amount < 0 &&
      Math.abs(req.body.amount) > (target?.balance ?? 0)
    )
      return res.status(400).send("Insufficient balance");

    let successful: boolean = false;

    // Logics
    if (req.body.amount > 0) {
      // Deduct the tokens from the requester
      if (requesterFirebase) {
        await User.findOneAndUpdate(
          {
            discordId: req.body.discordId,
          },
          {
            $inc: {
              balance: req.body.amount * -1,
            },
          }
        );
      } else if (requesterTemp) {
        await DiscordUser.findOneAndUpdate(
          {
            discordId: req.body.discordId,
          },
          {
            $inc: {
              balance: req.body.amount * -1,
            },
          }
        );
      } else {
        return res.status(404).send("Requester info not found");
      }
      // Grant the target tokens
      if (targetFirebase) {
        await DiscordUser.findOneAndUpdate(
          {
            discordId: req.body.targetDiscordId,
          },
          {
            $inc: {
              balance: req.body.amount,
            },
          }
        );
      } else if (targetTemp) {
        await DiscordUser.findOneAndUpdate(
          {
            discordId: req.body.discordId,
          },
          {
            $inc: {
              balance: req.body.amount,
            },
          }
        );
      } else {
        return res.status(404).send("Target not found");
      }
    } else if (req.body.amount < 0) {
      // Determine if successful or not
      // 20% - 50%, the more the user steal, the lower the chance is
      // The percent stop deceasing after 500 tokens
      // The value must be higher than the Threshold to steal succesfully
      const successfulThreshold =
        0.5 + 0.3 * Math.min(req.body.amount / 500, 1);
      successful = Math.random() > successfulThreshold;
      if (successful) {
        // Success
        if (requesterFirebase) {
          await User.findOneAndUpdate(
            {
              discordId: req.body.discordId,
            },
            {
              $inc: {
                balance: req.body.amount * -1,
              },
            }
          );
        } else if (requesterTemp) {
          await DiscordUser.findOneAndUpdate(
            {
              discordId: req.body.discordId,
            },
            {
              $inc: {
                balance: req.body.amount * -1,
              },
            }
          );
        } else {
          return res.status(404).send("Requester info not found");
        }
        // Grant the target tokens
        if (targetFirebase) {
          await DiscordUser.findOneAndUpdate(
            {
              discordId: req.body.targetDiscordId,
            },
            {
              $inc: {
                balance: req.body.amount,
              },
            }
          );
        } else if (targetTemp) {
          await DiscordUser.findOneAndUpdate(
            {
              discordId: req.body.discordId,
            },
            {
              $inc: {
                balance: req.body.amount,
              },
            }
          );
        } else {
          return res.status(404).send("Target not found");
        }
      } else {
        // Fail LOL
        if (requesterFirebase) {
          await User.findOneAndUpdate(
            {
              discordId: req.body.discordId,
            },
            {
              $inc: {
                balance: req.body.amount,
              },
            }
          );
        } else if (requesterTemp) {
          await DiscordUser.findOneAndUpdate(
            {
              discordId: req.body.discordId,
            },
            {
              $inc: {
                balance: req.body.amount,
              },
            }
          );
        } else {
          return res.status(404).send("Requester info not found");
        }
      }
    }
    return res.status(200).send({
      successful,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default discordRouter;