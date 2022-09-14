import { Routes } from "discord-api-types/v9";
import { InteractionResponseType } from "discord-interactions";
import { axiosBackendInstance } from "../../api/instance";
import { CommandHandler, DeferCommandHandler } from "../handler";

const DeferWalletCommand: DeferCommandHandler = async (message, rest) => {
  try {
    const discordId = message.member?.user.id;

    const response = await axiosBackendInstance.get<{
      balance: number;
      discordId: string;
    }>(`/discord/wallet/${discordId}`);

    console.log(response.data);

    await rest.patch(
      Routes.webhookMessage(process.env.APP_ID!, message.token),
      {
        body: {
          content: `<@${discordId}> ตอนนี้เจ้าอยู่ tokens อยู่ ${
            response.data.balance ?? 0
          } ${
            response.data.discordId
              ? ""
              : "(นายยังไม่ได้เชื่อมกับบัตรบน website น้า ถ้ามีบัญชีบนเว็บสามารถ /link เพื่อเชื่อมได้เลยนะ)"
          }`,
        },
      }
    );
  } catch (e) {
    await rest.patch(
      Routes.webhookMessage(process.env.APP_ID!, message.token),
      {
        body: {
          content: `**ไม่นะ! บอทมันก่องก้อง บัครับประทาน ลองติดต่อ Staff ดูน้า** เหตุผล: ${e.response.data}`,
        },
      }
    );
  }
};

export default DeferWalletCommand;