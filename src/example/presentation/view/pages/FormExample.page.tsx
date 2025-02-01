
import PageTitle from "@Atom/PageTitle";
import { Card, Stack } from "@mantine/core";
import FormExampleUserData from "../components/Form/FormExampleUserData";
import FormExampleUserDataWithUpload from "../components/Form/FormExampleUserDataWithUpload";


export default function FormExamplePage() {
  return (
    <>
      <PageTitle
        className="mb-6"
        title="Example Form"
        subtitle="with validation"
      />
      <Stack>
        <Card>
          <FormExampleUserData/>
        </Card>
        <Card>
          <FormExampleUserDataWithUpload/>
        </Card>
      </Stack>
    </>
  );
}
