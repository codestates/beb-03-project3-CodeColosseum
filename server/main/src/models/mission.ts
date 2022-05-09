import { Schema, model } from "mongoose";

const MissionSchema = new Schema(
  {
    title: { type: String, required: true }, // 
    description: { type: String, required: true }, // 문제 리스팅에 보여줄 간단 설명
    paragraph: { type: String, required: true }, // 문제 지문
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 크리에이터
    test: { type: Object, required: true }, // 테스트 객체 { case: [ ...{ in:[], out:[] } ], refCode, in:[], out:[] }
    // feedback: { type: Object, }, // 피드백 객체 { 별점평가, 코맨트, tag, 난이도투표, 리포트, 질문, 난이도rating, tagRating, 별점rating }
  },
  { timestamps: true }
);

const Mission = model("Mission", MissionSchema);

export = Mission