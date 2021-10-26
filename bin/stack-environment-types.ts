import cdk = require('@aws-cdk/core');
import {
  ComparisonOperator,
  TreatMissingData,
  GraphWidgetProps,
  SingleValueWidgetProps,
} from '@aws-cdk/aws-cloudwatch';

export interface IMetricsMt {
  componentType: string,
  metrics: {
    metricName: string,
    dimensions: {},
    statistic: 'Minimum' | 'min' | 'Maximum' | 'max' | 'Average' | 'avg' | 'Sum' | 'sum' | 'SampleCount' | 'n',
    duration: cdk.Duration,
    label: string,
    color: string
    alarms?: {
      threshold: number,
      evaluationPeriods: number,
      alarmName: string,
      alarmDescription: string,
      datapointsToAlarm: number,
      comparisonOperator: ComparisonOperator,
      treatMissingData: TreatMissingData,
    }[],
    graphs?: {
      graphWidgets?: GraphWidgetProps[],
      countWidget?: SingleValueWidgetProps[],
    }
  }[]
}

export interface IMtCloudwatchMonitoringStackProps extends cdk.StackProps {
  // Add your configuration types here.
  mtDashboardsName: string,
  mtEmail: string,
  mtAlarmTopic: string,
  mtAccount: string,
  mtMetricsCollection: IMetricsMt[],
}
