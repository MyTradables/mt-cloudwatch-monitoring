import * as cdk from '@aws-cdk/core';
import {
  Dashboard,
  GraphWidget,
  Metric,
  SingleValueWidget,
} from '@aws-cdk/aws-cloudwatch';
import * as cwa from '@aws-cdk/aws-cloudwatch-actions';
import * as sns from '@aws-cdk/aws-sns';
import * as subscriptions from '@aws-cdk/aws-sns-subscriptions';
import { IMtCloudwatchMonitoringStackProps } from '../bin/stack-environment-types';

class MtCloudwatchMonitoringStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: IMtCloudwatchMonitoringStackProps) {
    super(scope, id, props);

    /**
     * Creates AWS Cloudwatch dashboard for metrics collection.
     */
    const mtDashboard = new Dashboard(this, props.mtDashboardsName, { dashboardName: props.mtDashboardsName });

    /**
     * Imports AWS SNS topic for sending alarms to email.
     */
    const mtAlarmTopic = sns.Topic.fromTopicArn(
      this,
      'mtAlarmTopic',
      `arn:aws:sns:eu-west-1:${props.mtAccount}:${props.mtAlarmTopic}`,
    );

    /**
     * Creates AWS Cloudwatch metrics, Sets alarm to sns topic, Adds graph to dashboard.
     */
    props.mtMetricsCollection.forEach((component) => {
      component.metrics.forEach((metric) => {
        // Creates metrics for each component.
        const mtMetric = new Metric({
          namespace: component.componentType,
          metricName: metric.metricName,
          label: metric.label,
          color: metric.color,
          statistic: metric.statistic,
          period: metric.duration,
          dimensions: metric.dimensions,
        });

        // Creates alarm on metric if needed.
        if (metric.alarms) {
          metric.alarms.forEach((alarm) => {
            const mtAlarm = mtMetric.createAlarm(
              this,
              alarm.alarmName,
              {
                alarmName: alarm.alarmName,
                alarmDescription: alarm.alarmDescription,
                treatMissingData: alarm.treatMissingData,
                evaluationPeriods: alarm.evaluationPeriods,
                comparisonOperator: alarm.comparisonOperator,
                datapointsToAlarm: alarm.datapointsToAlarm,
                threshold: alarm.threshold,
              },
            );
            // Adds alarm to sns topic to email.
            mtAlarmTopic.addSubscription(new subscriptions.EmailSubscription(props.mtEmail));
            mtAlarm.addAlarmAction(new cwa.SnsAction(mtAlarmTopic));
          });
        }

        // Creates graph on metric if needed.
        if (metric.graphs) {
          if (metric.graphs.graphWidgets) {
            metric.graphs.graphWidgets.forEach((graphWidget) => {
              // Creates graph widget on dashboard.
              mtDashboard.addWidgets(new GraphWidget({
                title: graphWidget.title,
                period: graphWidget.period,
                view: graphWidget.view,
                width: graphWidget.width,
                left: [mtMetric],
              }));
            });
          }
          if (metric.graphs.countWidget) {
            metric.graphs.countWidget.forEach((countWidget) => {
              // Creates count widget on dashboard.
              mtDashboard.addWidgets(new SingleValueWidget({
                title: countWidget.title,
                width: countWidget.width,
                metrics: [mtMetric],
              }));
            });
          }
        }
      });
    });
  }
}

export default MtCloudwatchMonitoringStack;
