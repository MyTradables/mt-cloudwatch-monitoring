#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import MtCloudwatchMonitoringStack from '../lib/mt-cloudwatch-monitoring-stack';

// importing configuration based on environment
import environmentConfig from './stack-config';

const app = new cdk.App();

// injecting configurations into stack based on environment.
new MtCloudwatchMonitoringStack(app, 'mt-cloudwatch-monitoring', environmentConfig);
