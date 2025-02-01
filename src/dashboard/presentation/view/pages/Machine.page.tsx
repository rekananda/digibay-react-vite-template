import PageTitle from "@Atom/PageTitle";
import { Grid, GridCol } from "@mantine/core";
import MachineMonitoringCard from "../components/MachineMonitoringCard";

export default function MachineDashboardPage() {
  return (
    <>
      <PageTitle
        className="mb-6"
        title="Machine Monitoring"
        subtitle="Put any short description here."
      />
      <Grid gutter={24}>
        {Array(20).fill(null).map((_, i) => (
          <GridCol key={i} span={{ base: 12, md: 4, lg: 3 }}>
            <MachineMonitoringCard
              title={`Machine ${i+1 < 10 ? '0' : ''}${i+1}`}
            />
          </GridCol>
        ))}
      </Grid>
    </>
  );
}
