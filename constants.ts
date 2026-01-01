
import { 
  FeatureDefinition, FeatureCategory, ThrottlingPolicy, ThrottlingStrategy, 
  UserSegment, AlertDefinition, AlertSeverity, AlertInstance, 
  SystemHealthMetric, HistoricalCognitiveData, PredictiveForecast,
  FeedbackLoopStatus, AgentDefinition, AgentCategory, AgentSkill,
  AgentHealthMetric, TokenRailMetrics, TokenRailType, TokenAccountSnapshot,
  TokenTransactionStatus, PaymentEngineStatus, IdentityServiceStatus,
  IntegrationConfig, AuthEventType, AuthLogEntry, EscalationPolicy
} from './types';

export const mockFeatures: FeatureDefinition[] = [
  {
    id: 'feat_adv_analytics', name: 'Advanced Analytics', description: 'Provides deep dive data analysis tools.', category: FeatureCategory.Analytics, cognitiveWeight: 0.9, baseThrottleThreshold: 0.8, isActive: true, dependencies: [], impactMetrics: [{ name: 'decision_quality', value: 0.8 }], recoveryTimeEstimate: 300, lastUpdated: '2023-01-15T10:00:00Z', ownerTeam: 'Data Science', rolloutStrategy: 'all_users'
  },
  {
    id: 'feat_realtime_collaboration', name: 'Realtime Collaboration', description: 'Enables live document editing and chat.', category: FeatureCategory.Collaboration, cognitiveWeight: 0.8, baseThrottleThreshold: 0.75, isActive: true, dependencies: [], impactMetrics: [{ name: 'team_productivity', value: 0.9 }], recoveryTimeEstimate: 240, lastUpdated: '2023-01-16T11:00:00Z', ownerTeam: 'Productivity Suite', rolloutStrategy: 'all_users'
  },
  {
    id: 'feat_ai_assistant', name: 'AI Assistant', description: 'Provides intelligent suggestions and automation.', category: FeatureCategory.Automation, cognitiveWeight: 0.95, baseThrottleThreshold: 0.88, isActive: true, dependencies: [], impactMetrics: [{ name: 'user_efficiency', value: 0.92 }], recoveryTimeEstimate: 360, lastUpdated: '2023-01-21T16:00:00Z', ownerTeam: 'AI Research', rolloutStrategy: 'beta_testers'
  },
  {
    id: 'feat_token_rail_monitor', name: 'Token Rail Monitor', description: 'Observe real-time performance of token rails.', category: FeatureCategory.TokenRails, cognitiveWeight: 0.6, baseThrottleThreshold: 0.7, isActive: true, dependencies: [], impactMetrics: [{ name: 'financial_transaction_speed', value: 0.99 }], recoveryTimeEstimate: 120, lastUpdated: '2023-03-01T10:00:00Z', ownerTeam: 'Fintech Core', rolloutStrategy: 'all_users'
  },
  {
    id: 'feat_identity_security', name: 'Identity & Security Controls', description: 'Configure digital identity and access policies.', category: FeatureCategory.Identity, cognitiveWeight: 0.9, baseThrottleThreshold: 0.9, isActive: true, dependencies: [], impactMetrics: [{ name: 'security_incident_reduction', value: 0.99 }], recoveryTimeEstimate: 300, lastUpdated: '2023-03-01T12:00:00Z', ownerTeam: 'Security Team', rolloutStrategy: 'all_users'
  }
];

export const mockThrottlingPolicies: ThrottlingPolicy[] = [
  {
    id: 'policy_high_load_general', name: 'High Load General Throttling', description: 'Activates when overall cognitive load is very high.', strategy: ThrottlingStrategy.DynamicAdaptive, targetFeatureIds: ['feat_adv_analytics', 'feat_ai_assistant'], userSegments: [UserSegment.ExperiencedUser], thresholdConfig: { minLoad: 0.85, maxLoad: 0.95, durationThreshold: 60, cooldownPeriod: 300 }, activationConditions: ['avgCognitiveLoad_gt_0.85'], deactivationConditions: ['avgCognitiveLoad_lt_0.75'], priority: 1, isActive: true, lastModifiedBy: 'admin', lastModifiedDate: '2023-02-01T09:00:00Z', efficacyMetrics: [{ name: 'reduced_avg_load', targetValue: 0.1 }]
  }
];

export const mockAlertDefinitions: AlertDefinition[] = [
  {
    id: 'alert_critical_load', name: 'Critical Cognitive Load', description: 'Total average cognitive load exceeds critical threshold.', severity: AlertSeverity.Critical, condition: 'avgCognitiveLoad > 0.9', targetFeatures: [], targetUserSegments: [], notificationChannels: ['email', 'slack'], isActive: true, debouncePeriod: 300, autoResolveCondition: 'avgCognitiveLoad < 0.8'
  }
];

export const mockSystemHealthMetrics: SystemHealthMetric[] = Array.from({ length: 20 }).map((_, i) => ({
  timestamp: new Date(Date.now() - (19 - i) * 30000).toISOString(),
  cpuUsage: 45 + Math.random() * 40,
  memoryUsage: 60 + Math.random() * 20,
  networkLatency: 20 + Math.random() * 50,
  databaseConnections: 120 + Math.floor(Math.random() * 80),
  errorRate: Math.random() * 0.4,
  queueDepth: Math.floor(Math.random() * 150),
  activeUsers: 850 + Math.floor(Math.random() * 300),
  backgroundTasks: 15 + Math.floor(Math.random() * 10),
  diskIO: 300 + Math.floor(Math.random() * 200),
  apiCallRate: 1200 + Math.floor(Math.random() * 500),
}));

export const mockAgentDefinitions: AgentDefinition[] = [
  {
    id: 'agent_fraud_detector', name: 'Fraud Detection Agent', description: 'Monitors transactions for suspicious patterns.', category: AgentCategory.FraudDetection, skills: [AgentSkill.AnomalyDetection, AgentSkill.RiskAssessment], status: 'active', configuration: {}, operationalLoadThreshold: 100, lastUpdated: '2023-03-01T13:00:00Z', ownerTeam: 'Security AI', rbacRole: 'fraud_analyst_agent'
  }
];

export const mockTokenRailMetrics: TokenRailMetrics[] = [
  {
    timestamp: new Date().toISOString(), railId: 'rail_fast', railType: TokenRailType.Fast, tps: 1450, avgLatency: 45, errorRate: 0.001, queueDepth: 12, status: 'operational', totalValueTransacted: 12500000
  },
  {
    timestamp: new Date().toISOString(), railId: 'rail_batch', railType: TokenRailType.Batch, tps: 8500, avgLatency: 1200, errorRate: 0.005, queueDepth: 450, status: 'degraded', totalValueTransacted: 45000000
  }
];
