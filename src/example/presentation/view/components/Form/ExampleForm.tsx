/* eslint-disable max-lines */
import dayjs from "dayjs";
import { ActionIcon, Divider, Grid, GridCol, Group, Text } from "@mantine/core";
import { hasLength, isEmail, isInRange, matches, useForm } from "@mantine/form";
import Icon from "@/common/presentation/view/components/atom/Icon";
import InputText from "@/common/presentation/view/components/atom/FormInput/InputText";
import InputTextarea from "@/common/presentation/view/components/atom/FormInput/InputTextarea";
import InputPin from "@/common/presentation/view/components/atom/FormInput/InputPin";
import InputSlider, { InputRangeSlider } from "@/common/presentation/view/components/atom/FormInput/InputSlider";
import InputNumber from "@/common/presentation/view/components/atom/FormInput/InputNumber";
import InputSelect from "@/common/presentation/view/components/atom/FormInput/InputSelect";
import { OptionsDummy } from "@/example/presentation/view-model/utils/dummiesData";
import InputSelectMultiple from "@/common/presentation/view/components/atom/FormInput/InputSelectMultiple";
import InputDate, { InputDateTime, InputMonth, InputYear } from "@/common/presentation/view/components/atom/FormInput/InputDate";
import InputRadio from "@/common/presentation/view/components/atom/FormInput/InputRadio";
import InputCheckbox, { InputCheckboxGroup } from "@/common/presentation/view/components/atom/FormInput/InputCheckbox";
import InputChip from "@/common/presentation/view/components/atom/FormInput/InputChip";
import InputSwitch, { InputSwitchGroup, InputSwitchToogle } from "@/common/presentation/view/components/atom/FormInput/InputSwitch";
import InputRTE from "@/common/presentation/view/components/atom/FormInput/InputRTE";
import InputDropzone from "@/common/presentation/view/components/atom/FormInput/InputDropzone";

type FormDataT = {
  text: string;
  email: string;
  password: string;
  number: number;
  curency: number;
  phone: string;
  select?: string;
  autocomplete?: string;
  multiple: string[];
  tags: string[];
  multipleoutside: string[];
  tagsoutside: string[];
  textarea: string;
  radio: boolean;
  radioGroup: string | null;
  radioGroupCard: string | null;
  checkbox: boolean;
  checkboxGroup: string[];
  checkboxGroupCard: string[];
  chip: string;
  chipMultiple: string[];
  pin: string;
  slider: number;
  rangeSlider: number[];
  switch: boolean;
  switchToogle: boolean;
  switchGroup: string[];
  rte: string;
  date: Date | null;
  datetime: Date | null;
  month: Date | null;
  year: Date | null;
  monthString: string;
  yearString: string;
};
const ExampleForm = () => {
  const form = useForm<FormDataT>({
    mode: "controlled",
    initialValues: {
      text: "Text",
      email: "mail@mail.com",
      password: "",
      number: 100,
      curency: 1000000,
      phone: "+631234567890",
      select: undefined,
      autocomplete: undefined,
      multiple: [],
      tags: [],
      multipleoutside: [],
      tagsoutside: [],
      textarea: "",
      radio: false,
      radioGroup: null,
      radioGroupCard: null,
      checkbox: false,
      checkboxGroup: [],
      checkboxGroupCard: [],
      chip: "",
      chipMultiple: [],
      pin: "",
      slider: 0,
      rangeSlider: [0, 100],
      switch: false,
      switchToogle: true,
      switchGroup: [],
      rte: "",
      date: dayjs().toDate(),
      datetime: null,
      month: dayjs().toDate(),
      year: dayjs().toDate(),
      monthString: dayjs().format("MMMM"),
      yearString: dayjs().format("YYYY"),
    },
    validateInputOnChange: true,
    validate: {
      email: isEmail("Invalid email"),
      curency: isInRange({ min: 100000 }, "Minimum value is 100.000"),
      phone:
        matches(/^\+[0-9]+$/, "Must Select country code") ||
        hasLength({ min: 12 }, "Value must have 12 or more characters"),
    },
    transformValues: (values) => ({
      ...values,
      //this olny afffecting after submit
      monthString: dayjs(values.month).format("MMMM"),
      yearString: dayjs(values.year).format("YYYY"),
    }),
    onValuesChange(values) {
      // listen changes values
      console.log({ values });
    },
  });

  const onSubmit = () => {
    console.log(form.getValues());
  };

  return (
    <form name="example-form" className="w-full">
      <Group justify="space-between" mb={24}>
        <Text className="font-title-content">Example Data</Text>
        <ActionIcon
          className="font-title-content"
          color="gray"
          variant="light"
          onClick={() => {
            onSubmit();
          }}
        >
          <Icon name="IconDeviceFloppy" />
        </ActionIcon>
      </Group>

      <Grid>
        <GridCol span={12}>
          <Text className="font-label">InputText</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputText
            label="Text Input Label"
            tooltip="tooltip"
            description="description"
            key={form.key("text")}
            {...form.getInputProps("text")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputText
            label="Email Input Label"
            tooltip="tooltip"
            description="description"
            formtype="email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputText
            label="Password Input Label"
            tooltip="tooltip"
            description="description"
            formtype="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputTextarea</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 12, lg: 6 }}>
          <InputTextarea
            label="TextArea Input Label"
            tooltip="tooltip"
            description="description"
            minRows={2}
            key={form.key("textarea")}
            {...form.getInputProps("textarea")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputPin</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputPin
            label="Pin Input Label"
            description="description"
            length={6}
            key={form.key("pin")}
            {...form.getInputProps("pin")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputSlider</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputSlider
            label="Slider Input Label"
            description="description"
            marks={[
              { value: 25, label: "25%" },
              { value: 50, label: "50%" },
              { value: 75, label: "75%" },
            ]}
            key={form.key("slider")}
            {...form.getInputProps("slider")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputRangeSlider
            label="Range Slider Input Label"
            description="description"
            marks={[
              { value: 25, label: "25%" },
              { value: 50, label: "50%" },
              { value: 75, label: "75%" },
            ]}
            key={form.key("rangeSlider")}
            {...form.getInputProps("rangeSlider")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputNumber</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputNumber
            label="Number Input Label"
            tooltip="tooltip"
            description="description"
            key={form.key("number")}
            {...form.getInputProps("number")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputNumber
            label="Curency Input Label"
            tooltip="tooltip"
            description="description"
            formtype="curency"
            key={form.key("curency")}
            {...form.getInputProps("curency")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputNumber
            label="Phone Input Label"
            tooltip="tooltip"
            description="description"
            formtype="phone"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputSelect</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputSelect
            label="Select Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy}
            key={form.key("select")}
            {...form.getInputProps("select")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputSelect
            label="Autocomplete Input Label"
            tooltip="tooltip"
            description="description"
            formtype="autocomplete"
            data={OptionsDummy}
            key={form.key("autocomplete")}
            {...form.getInputProps("autocomplete")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputSelectMultiple</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputSelectMultiple
            label="Multiple Select Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy}
            key={form.key("multiple")}
            {...form.getInputProps("multiple")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputSelectMultiple
            label="Tags Input Label"
            tooltip="tooltip"
            description="description"
            formtype="tags"
            data={OptionsDummy}
            key={form.key("tags")}
            {...form.getInputProps("tags")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputDate</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputDate
            label="Date Input Label"
            description="description"
            key={form.key("date")}
            {...form.getInputProps("date")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputDateTime
            label="Date Time Input Label"
            description="description"
            key={form.key("datetime")}
            {...form.getInputProps("datetime")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputMonth
            label="Month Input Label"
            description="description"
            key={form.key("month")}
            {...form.getInputProps("month")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputYear
            label="Year Input Label"
            description="description"
            key={form.key("year")}
            {...form.getInputProps("year")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputRadio</Text>
        </GridCol>
        <GridCol span={12}>
          <InputRadio
            label="Radio Group Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy.slice(0, 12)}
            dataProps={{ columns: 4 }}
            key={form.key("radioGroup")}
            {...form.getInputProps("radioGroup")}
          />
        </GridCol>
        <GridCol span={12}>
          <InputRadio
            label="Radio Group Card Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy.slice(0, 12).map((d) => ({
              ...d,
              description: "description",
            }))}
            dataProps={{ columns: 4 }}
            usingCard
            key={form.key("radioGroupCard")}
            {...form.getInputProps("radioGroupCard")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputCheckbox</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputCheckbox
            label="Checkbox Input Label"
            description="description"
            key={form.key("checkbox")}
            {...form.getInputProps("checkbox", { type: "checkbox" })}
          />
        </GridCol>
        <GridCol span={12}>
          <InputCheckboxGroup
            label="Checkbox Group Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy.slice(0, 12)}
            dataProps={{ columns: 4 }}
            key={form.key("checkboxGroup")}
            {...form.getInputProps("checkboxGroup")}
          />
        </GridCol>
        <GridCol span={12}>
          <InputCheckboxGroup
            label="Checkbox Group Card Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy.slice(0, 12).map((d) => ({
              ...d,
              description: "description",
            }))}
            dataProps={{ columns: 4 }}
            usingCard
            key={form.key("checkboxGroupCard")}
            {...form.getInputProps("checkboxGroupCard")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputChip</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <InputChip
            label="Chip Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy}
            dataProps={{ wrap: true }}
            key={form.key("chip")}
            {...form.getInputProps("chip")}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <InputChip
            label="Chip Multiple Input Label"
            tooltip="tooltip"
            description="description"
            data={OptionsDummy}
            dataProps={{ wrap: true }}
            multiple={true}
            key={form.key("chipMultiple")}
            {...form.getInputProps("chipMultiple")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputSwitch</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputSwitch
            label="Switch Input Label"
            description="description"
            key={form.key("switch")}
            {...form.getInputProps("switch", { type: "checkbox" })}
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputSwitchToogle
            label="Toogle Switch Input Label"
            description="description"
            toogleLabel={["Not Checked Label", "Checked Label"]}
            key={form.key("switchToogle")}
            {...form.getInputProps("switchToogle", { type: "checkbox" })}
          />
        </GridCol>
        <GridCol span={12}>
          <InputSwitchGroup
            label="Switch Group Input Label"
            description="description"
            data={OptionsDummy}
            key={form.key("switchGroup")}
            {...form.getInputProps("switchGroup")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputRTE</Text>
        </GridCol>
        <GridCol span={12}>
          <InputRTE
            label="Rich text editor Label"
            description="description"
            extensions={["cycle", "align", "hyperlink", "text-style", "extra"]}
            key={form.key("rte")}
            {...form.getInputProps("rte")}
          />
        </GridCol>
        <GridCol span={12}>
          <Divider mb="md" />
          <Text className="font-label">InputRTE</Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <InputDropzone
            label="Dropzone Label"
            description="description"
            maxSize={10}
            unit="MB"
            multiple
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <InputDropzone
            label="Dropzone Image Label"
            description="with preview"
            maxSize={10}
            unit="MB"
            multiple
            withPreview
          />
        </GridCol>
        {/* <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputDropzoneImage
            label="Custom Dropzone Label"
            description="description"
          />
        </GridCol>
        <GridCol span={{ base: 12, md: 4, lg: 3 }}>
          <InputDropzoneImage
            label="Custom Multiple Dropzone Label"
            description="description"
            multiple
          />
        </GridCol> */}
      </Grid>
    </form>
  );
};

export default ExampleForm;
