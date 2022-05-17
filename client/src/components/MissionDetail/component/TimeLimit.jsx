import S from "./TimeLimit.styled";
import { parseDate } from "../../../utils/date";

const TimeLimit = ({startTime, endTime}) => {
    return (
        <S.TimeLimit>
            <S.P>시간 제한</S.P>
            <S.P>{`${parseDate(startTime)}`} 부터</S.P>
            <S.P>{`${parseDate(endTime)}`} 까지</S.P>
        </S.TimeLimit>
    );
}

export default TimeLimit;