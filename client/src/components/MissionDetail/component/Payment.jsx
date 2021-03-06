import S from "./Payment.styled"
import C from "../../CommonStyled";
import { usePayKIP7 } from "../../../contracts/tokenContract";

const Payment = ({setIsPaid, id, setMissionData, txSignReqObj, setIsOpen}) => {

    const payKIP7 = usePayKIP7(setIsPaid, id, setMissionData, txSignReqObj, setIsOpen);

    return (
        <S.Payment>
            <S.H1>콜로세움에 도전하기 위해서 토큰의 지불이 필요합니다.</S.H1>
            <S.Div>
                <C.Button onClick={payKIP7}>지불하기</C.Button>
            </S.Div>
            <S.P>지불 후 트랜잭션 처리에 시간이 필요합니다. 잠시 기다려 주세요.</S.P>
        </S.Payment>
    );
}

export default Payment;