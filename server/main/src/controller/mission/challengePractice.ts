import axios from "axios";
import { fromDb } from "../../config";
import { log, mineNft } from "../../contract";
import models from "../../models";
import {
  editMineOwnerRewardLog,
  findUserInfoByAccount,
  gradingMission,
  updateUserMineralBalance,
} from "../../utils";

const post = async (req: any, res: any) => {
  const { account, missionId, code, reqType } = req.body;

  try {
    const userInfo = await models.User.findOne({ account });
    const missionInfo = await models.Mission.findOne({ _id: missionId });
    const isTest = reqType === 1 ? true : false;
    const testCases =
      reqType === 1
        ? missionInfo.testCases.filter((testCase: any) => {
            return testCase.isExample === true;
          })
        : missionInfo.testCases;

    // console.log(testCases);
    const gradingResult = await gradingMission(testCases, code);

    // console.log(gradingResult);
    const isPassed =
      gradingResult.data === undefined
        ? false
        : gradingResult.data.failCount === 0
        ? true
        : false;
    try {
      let challenge;
      if (reqType === 2) {
        challenge = {
          challenger: userInfo._id,
          mission: missionId,
          kind: 2,
          answerCode: code,
          isPassed,
          PassedCasesRate: `${
            testCases.length - gradingResult.data.failCount
          } / ${testCases.length}`,
          passedCases: gradingResult.data.passedCases,
        };
        await models.Challenge.create(challenge);
      }

      // 풀이에 성공한 경우 미네랄 지급
      const challengeInfo = await models.Challenge.findOne(challenge);
      if (reqType === 2 && isPassed) {
        console.log("미네랄 지급 시작");
        // TODO
        // challenger에게 +mineral
        // mineral log 기록
        // 중복 지급 방지
        await log.createMiningMineralLog(challengeInfo);
        console.log("createMingMineralLog 완료");
        await updateUserMineralBalance(userInfo._id);
        console.log("updateUserMineral 완료");
        console.log("미네랄 지급 완료");

        // nft 보유자는 토큰이 쌓임
        await editMineOwnerRewardLog("reward", missionId);
      }

      res.status(200).send({
        message: gradingResult.message,
        data: {
          ...gradingResult.data,
          isPassed: challengeInfo.isPassed,
          isTest,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "DB upload Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Failed to load data" });
  }
};

export = { post };
