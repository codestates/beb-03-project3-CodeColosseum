import models from "../../models";

const get = async (req: any, res: any) => {
  const missionId = req.params.mission_id;

  try {
    const missionInfo = await models.Mission.findOne({ _id: missionId });

    if (missionInfo.state === 1) {
      res
        .status(404)
        .send({ message: "This Mission is not a practice mission." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load Mission Data" });
  }

  try {
    const mission = await models.Mission.findOne({ _id: missionId });
    const creatorInfo = await models.User.findOne({ _id: mission.creator });

    const missionInfo = {
      title: mission.title,
      create: creatorInfo.nickName,
      paragraph: mission.paragraph,
      testCases: mission.testCases,
      inputs: mission.inputs,
      output: mission.output,
    };
    res.status(200).send({ message: "Success", data: { missionInfo } });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to Load" });
  }
};

export = { get };
