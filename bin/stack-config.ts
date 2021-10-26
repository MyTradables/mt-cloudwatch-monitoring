import { completeTestMetric } from '../lib/metrics/completeTestMetric';
import { minimalTestMetric } from '../lib/metrics/minimalTestMetric';
import { IMtCloudwatchMonitoringStackProps } from './stack-environment-types';

const environmentConfig: IMtCloudwatchMonitoringStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'MyTradables.com',
  },
  mtDashboardsName: 'Mt-Dashboard',
  mtEmail: 'myTradables@gmail.com',
  mtAlarmTopic: 'mtAlarmTopic',
  mtAccount: '444455556666',
  mtMetricsCollection: [
    completeTestMetric,
    minimalTestMetric,
  ],
};
export default environmentConfig;
