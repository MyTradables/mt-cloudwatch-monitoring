import { Duration } from '@aws-cdk/core';
import { Color } from '@aws-cdk/aws-cloudwatch';
import { IMetricsMt } from '../../bin/stack-environment-types';

export const minimalTestMetric: IMetricsMt = {
  componentType: 'AWS/Lambda',
  metrics: [
    {
      metricName: 'Invocations',
      dimensions: {
        LambdaMetrics: 'Invocations',
      },
      statistic: 'SampleCount',
      duration: Duration.days(1),
      label: 'lambda throttles',
      color: Color.RED,
    },
  ],
};