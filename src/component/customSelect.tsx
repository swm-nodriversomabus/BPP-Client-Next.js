import Image from 'next/image';
import selectoption_off from 'public/selectoption_off.svg';

const CustomOption: any = (Props: { children: string | undefined }) => {
  return (
    <div className="CustomOption">
      {Props.children}
      <Image src={selectoption_off} alt="" />
    </div>
  );
};

const CustomSelect: any = (Props: { children: string | undefined }) => {
  return <div className="CustomSelect">{Props.children}</div>;
};

export default CustomSelect;
export { CustomOption };
