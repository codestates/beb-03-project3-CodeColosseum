import { Schema, model } from "mongoose";
import type { Output, Inputs, TestCases, MissionState, MissionCollosseum, MissionNft } from '../utils'; // 필드의 상세한 타입 정의 바로가기

const schema = new Schema(
  {
    title: { type: String, required: true }, // 
    description: { type: String, /* required: true */ }, // 문제 리스팅에 보여줄 간단 설명
    paragraph: { type: String, required: true }, // 문제 지문
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 크리에이터
    state : { type: Number, required: true }, // <MissionState>
    colosseum: { type: Object }, // <MissionCollosseum>
    nft: { type: Object }, // <MissionNft>
    // mine: { type: Object}, // <MissionMine>
    inputs: { type: Array, required: true }, // <Inputs>
    output: { type: Object, required: true }, // <Output>
    refCode: { type: String, required: true }, // 
    testCases: { type: Array, required: true }, // <TestCases>
    // feedback: { type: Object, }, // 피드백 객체 { 별점평가, 코맨트, tag, 난이도투표, 리포트, 질문, 난이도rating, tagRating, 별점rating }
  },
  { timestamps: true }
);

const Model = model("Mission", schema);

export = Model