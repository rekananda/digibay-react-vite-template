import restContries from "@/common/config/restcontriesAPI";
import { Box, ComboboxItem, ComboboxLikeRenderOptionInput, CSSProperties, NumberInput, NumberInputFactory, NumberInputProps, SelectProps, StylesApiProps } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { labelprops, LabelValue } from "./index.d";
import InputSelect from "./InputSelect";

export type PropsInputNumberT = {
  label?: string;
  tooltip?: string;
  error?: ReactNode;
  formtype?: "number" | "curency" | "phone";
  styles?:StylesApiProps<NumberInputFactory> & {input: CSSProperties}
} & NumberInputProps

type PhodeDataT = {
  code: string;
  country: string;
}

const getRestCounrtyPhoneCode = ():PhodeDataT[] =>{
  let list:PhodeDataT[] = []; 
  restContries.forEach((d) => {
    if (d.idd.root){
      if (d.idd.suffixes && d.idd.suffixes.length == 1) {
        d.idd.suffixes?.forEach((suffix) => {
          list.push({code: `${d.idd.root}${suffix}`, country: d.name.common});
        })
      } else {
        list.push({code: `${d.idd.root}`, country: d.name.common});
      }
    }
  })
      
  list.sort((a, b) => {
    if (a.code < b.code) return -1;
    if (a.code > b.code) return 1;
    return 0;
  });
      
  list = Object.values(list.reduce((acc: Record<string, PhodeDataT>, { code, country }) => {
    if (acc[code]) {
      acc[code].country += `, ${country}`;
    } else {
      acc[code] = { code, country };
    }
    return acc;
  }, {}));

  return list;
}

const InputNumber = (props: PropsInputNumberT) => {
  const { 
    formtype = "number", 
    tooltip, 
    label,
    ...rest
  } = props;
  const placeholder = !rest.placeholder ? 
    label ? `Masukan ${label.toLocaleLowerCase()}`:`Masukan nilai`:
    rest.placeholder;

  const listCode: PhodeDataT[] = getRestCounrtyPhoneCode();
  const [phone, setPhone] = useState<{code: string, number: string|number}>({
    code: "",
    number: ""
  });

  const findMatchCode = (value: string): string => {
    let match = "";
    const codeOnly = listCode.map((d) => d.code);
    const fivecharCode = codeOnly.filter((d) => d.length === 5);
    const fourcharCode = codeOnly.filter((d) => d.length === 4);
    const threecharCode = codeOnly.filter((d) => d.length === 3);
    const twocharCode = codeOnly.filter((d) => d.length === 2);
    match = fivecharCode.find(code => value.startsWith(code)) || 
    fourcharCode.find(code => value.startsWith(code))|| 
    threecharCode.find(code => value.startsWith(code))|| 
    twocharCode.find(code => value.startsWith(code))|| '';
    return match;
  };

  const handleHaveValue = (val: string) => {
    const matchCode = findMatchCode(val);
    setPhone({number: val.toString().replace(matchCode, ''), code: matchCode})
  }

  const handleChangeValue = (val: string) => {
    rest.onChange && rest.onChange(val);
  }

  const renderCodeOption: SelectProps['renderOption'] = (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => {
    const { option } = item;
    
    const codeDetail = listCode.find((d) => d.code === option.value) ?? null;
    
    return `${option.value}${codeDetail? " "+codeDetail.country: ""}`
  };

  useEffect(() => {
    const val = (rest.value || "").toString();
    const defaultValue = (rest.defaultValue || "").toString();
    const typedValue = `${phone.code}${phone.number}`;

    if (formtype === 'phone') {
      // console.log("prop val", {val}, {defaultValue}, {typedValue})
      if (
        //handle if only default value set
        (/^\+/.test(defaultValue) && val === defaultValue) || 
        //handle if value is set (override by value)
        (/^\+/.test(typedValue) && /^\+/.test(val) && val !== typedValue)
      ) {
        handleHaveValue(val);
      }
    }
  }, [rest.value, rest.defaultValue])

  useEffect(() => {
    const val = (rest.value || "").toString();
    const typedValue = `${phone.code}${phone.number}`;
    let initVal = rest.defaultValue ? rest.defaultValue.toString() : '';

    if (formtype === 'phone' && /^\+/.test(typedValue)) {
      // console.log("dari changed typed", {val}, {initVal}, {typedValue})
        if (/^\+/.test(initVal) && /^\+/.test(val)){
          if (val !== typedValue && initVal !== typedValue){
            // console.log("perlu trigger change value atau typed")
            handleChangeValue(typedValue);
          }
        } else if (/^\+/.test(initVal) && val === ""){
          if (initVal !== typedValue){
            // console.log("perlu trigger change value atau typed 2")
            handleChangeValue(typedValue);
          }
        } else if (initVal === "" && /^\+/.test(val)){
          if (val !== typedValue){
            // console.log("perlu trigger change value atau typed 3")
            handleChangeValue(typedValue);
          }
        } else if (initVal === "" && val === ""){
          // console.log("perlu trigger change value atau typed 4")
          handleChangeValue(typedValue);
        }
    }
  }, [phone])

  return (
    <>
      {formtype === "phone" ?
        <Box className={`flex flex-col ${rest.className||""}`}>
          <NumberInput 
            leftSectionWidth={70}
            {...rest} 
            allowNegative={false} 
            clampBehavior="strict" 
            placeholder={placeholder} 
            valueIsNumericString={true} 
            label={LabelValue(tooltip, label)} 
            labelProps={labelprops(tooltip)}  
            onChange={(val) => setPhone((prev) => ({...prev, number: val}))}
            onBlur={(e) => setPhone((prev) => ({...prev, number: e.currentTarget.value}))}
            value={phone.number}
            required={rest.required} 
            hideControls
            leftSection={
              <InputSelect 
                className="mr-2"
                data={listCode.map(d => d.code)} 
                searchable 
                required={rest.required} 
                onChange={(val) => setPhone((prev) => ({...prev, code: val||""}))} 
                error={rest.error?true:false} 
                placeholder="code"
                value={phone.code}
                comboboxProps={{ width: 300, position: 'bottom-start' }}
                styles={{
                  root: {marginLeft: "-1px"},
                  input: {borderRadius: "var(--input-radius) 0 0 var(--input-radius)", paddingRight: "22px", ...rest.styles?.input},
                  section: { justifyContent: "flex-end"},
                  wrapper: { margin: 0}
                }}
                renderOption={(def) => renderCodeOption(def)}
              />
            }
            styles={{input: {paddingLeft: "var(--input-left-section-size)", ...rest.styles?.input}}}
          />
        </Box>:
        <NumberInput 
          {...rest} 
          allowNegative={false} 
          clampBehavior="strict" 
          label={LabelValue(tooltip, label)} 
          labelProps={labelprops(tooltip)}  
          placeholder={placeholder}
          prefix={formtype === "curency" ? "Rp. " : undefined} 
          thousandSeparator={formtype === "curency" ? "." : undefined} 
          decimalSeparator={formtype === "curency" ? "," : undefined}
        />
      }
    </>
  )
}

export default InputNumber;