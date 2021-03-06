import models from "../../models";

const post = async (req: any, res: any) => {
  const { account, missionId } = req.body;

  try {
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const userInfo = await models.User.findOne({ _id: missionInfo.creator });
    if (account === userInfo.account && missionInfo.state === 2) {
      try {
        await models.Mission.findOneAndUpdate({ _id: missionId }, { state: 3 });
        res.status(200).send({ message: "Success Minting" });
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: "DB update Error" });
      }
    } else {
      throw new Error("Not Owner Or Not State 2");
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export = { post };
