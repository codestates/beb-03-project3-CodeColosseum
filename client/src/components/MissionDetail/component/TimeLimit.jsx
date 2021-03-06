import S from "./TimeLimit.styled";
import StopWatch from "./StopWatch";
import { parseDate } from "../../../utils/date";

const TimeLimit = ({endTime}) => {

    return (
        <S.TimeLimit>
            <S.H2>시간 제한</S.H2>
            <S.P>{`${parseDate(endTime)}`} 까지</S.P>
            <StopWatch endTime={endTime}/>
        </S.TimeLimit>
    );
}

export default TimeLimit;