import PageTitle from "@Atom/PageTitle";
import { Card, Stack } from "@mantine/core";
import ExampleForm from "../components/Form/ExampleForm";

export default function FormComponentPage() {
  return (
    <>
      <Stack gap={24}>
        <PageTitle
          title="Forms"
          subtitle="Put any short description here."
        />
        <Card>
          <ExampleForm />
        </Card>
      </Stack>
    </>
  );
}
