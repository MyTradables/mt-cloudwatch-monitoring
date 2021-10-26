import { Duration } from '@aws-cdk/core';
import {
  Color,
  GraphWidgetView,
  ComparisonOperator,
  TreatMissingData,
} from '@aws-cdk/aws-cloudwatch';
import { IMetricsMt } from '../../bin/stack-environment-types';

export const completeTestMetric: IMetricsMt = {
  componentType: 'AWS/Lambda',
  metrics: [
    {
      metricName: 'Throttles',
      dimensions: {
        LambdaMetrics: 'Throttles',
      },
      statistic: 'SampleCount',
      duration: Duration.days(1),
      label: 'lambda throttles',
      color: Color.RED,
      alarms: [
        {
          threshold: 1,
          evaluationPeriods: 1,
          alarmName: 'testAlarm',
          alarmDescription: 'Alarm made for testing',
          datapointsToAlarm: 1,
          comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
          treatMissingData: TreatMissingData.NOT_BREACHING,
        },
      ],
      graphs: {
        graphWidgets: [
          {
            title: 'Testing graphs widget',
            view: GraphWidgetView.TIME_SERIES,
            period: Duration.days(1),
            width: 6,
          },
        ],
        countWidget: [
          {
            title: 'Testing count widget',
            width: 3,
            metrics:[],
          },
        ],
      },
    },
  ],
};