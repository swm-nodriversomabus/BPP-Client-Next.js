import Image from 'next/image';
import selectoption_on from 'public/selectoption_on.svg';
import selectoption_off from 'public/selectoption_off.svg';

const CustomOption: any = (Props: {
  children: string | undefined;
  selected: boolean | undefined;
  onClick: () => void | undefined;
}) => {
  return (
    <div className="CustomOption" onClick={Props.onClick}>
      {Props.children}
      <Image src={Props.selected ? selectoption_on : selectoption_off} alt="" />
    </div>
  );
};

const CustomSelect: any = (Props: { children: string | undefined }) => {
  return <div className="CustomSelect">{Props.children}</div>;
};

export default CustomSelect;
export { CustomOption };
