interface props {
  place: string | undefined;
  startDate: string | undefined;
  startTime: string | undefined;
  endDate: string | undefined;
  endTime: string | undefined;
}

const MatchPlan: any = ({
  place,
  startDate,
  startTime,
  endDate,
  endTime,
}: props) => {
  return (
    <div className="MatchPlan">
      <div>{place}</div>
      <div>
        {startDate}
        <div>{startTime}</div>
      </div>
      <div>
        {endDate}
        <div>{endTime}</div>
      </div>
    </div>
  );
};

export default MatchPlan;
