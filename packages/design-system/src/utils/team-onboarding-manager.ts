/**
 * Team Onboarding Manager
 * Handles team-specific onboarding and contribution tracking
 */

export interface TeamProfile {
  teamId: string;
  teamName: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  focusAreas: ('components' | 'themes' | 'documentation' | 'testing')[];
  preferredTools: string[];
  communicationChannels: string[];
  timezone: string;
  primaryContact: string;
  onboardingDate: Date;
}

export interface OnboardingPlan {
  teamId: string;
  trainingModules: TrainingModule[];
  mentorAssignment: MentorAssignment;
  firstContributions: StarterTask[];
  checkpoints: ProgressCheckpoint[];
  estimatedDuration: string;
  customResources: Resource[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'interactive' | 'workshop' | 'documentation';
  prerequisites: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  completionCriteria: string[];
}

export interface MentorAssignment {
  mentorId: string;
  mentorName: string;
  expertise: string[];
  availability: string;
  communicationPreference: string;
  meetingSchedule: string;
}

export interface StarterTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  learningObjectives: string[];
  resources: Resource[];
  acceptanceCriteria: string[];
}

export interface ProgressCheckpoint {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completionCriteria: string[];
  reviewRequired: boolean;
  reviewer?: string;
}

export interface Resource {
  title: string;
  type: 'documentation' | 'video' | 'example' | 'tool' | 'template';
  url: string;
  description: string;
}

export interface ContributionMetrics {
  teamId: string;
  period: { start: Date; end: Date };
  metrics: {
    contributionsCount: number;
    averageReviewTime: number; // hours
    qualityScore: number; // 0-100
    adoptionRate: number; // percentage
    feedbackScore: number; // 1-5
    completedTasks: number;
    activeMembers: number;
  };
  trends: {
    contributionTrend: 'increasing' | 'stable' | 'decreasing';
    qualityTrend: 'improving' | 'stable' | 'declining';
    engagementTrend: 'high' | 'medium' | 'low';
  };
}

export class TeamOnboardingManager {
  private teams: Map<string, TeamProfile> = new Map();
  private onboardingPlans: Map<string, OnboardingPlan> = new Map();
  private contributionMetrics: Map<string, ContributionMetrics> = new Map();

  /**
   * Create onboarding plan for a new team
   */
  createOnboardingPlan(team: TeamProfile): OnboardingPlan {
    const trainingModules = this.getRelevantTraining(
      team.skillLevel,
      team.focusAreas
    );
    const mentorAssignment = this.assignMentor(team);
    const firstContributions = this.suggestStarterTasks(team);
    const checkpoints = this.createProgressCheckpoints(team);

    const plan: OnboardingPlan = {
      teamId: team.teamId,
      trainingModules,
      mentorAssignment,
      firstContributions,
      checkpoints,
      estimatedDuration: this.calculateDuration(team.skillLevel),
      customResources: this.getCustomResources(team),
    };

    this.onboardingPlans.set(team.teamId, plan);
    this.teams.set(team.teamId, team);

    return plan;
  }

  /**
   * Track team contribution metrics
   */
  trackContribution(
    _teamId: string,
    contribution: {
      type: 'component' | 'documentation' | 'test' | 'fix';
      reviewTime: number;
      qualityScore: number;
      adopted: boolean;
    }
  ): void {
    const currentMetrics =
      this.contributionMetrics.get(teamId) || this.initializeMetrics(teamId);

    // Update metrics
    currentMetrics.metrics.contributionsCount++;
    currentMetrics.metrics.averageReviewTime =
      (currentMetrics.metrics.averageReviewTime + contribution.reviewTime) / 2;
    currentMetrics.metrics.qualityScore =
      (currentMetrics.metrics.qualityScore + contribution.qualityScore) / 2;

    if (contribution.adopted) {
      currentMetrics.metrics.adoptionRate =
        (currentMetrics.metrics.adoptionRate *
          (currentMetrics.metrics.contributionsCount - 1) +
          100) /
        currentMetrics.metrics.contributionsCount;
    }

    this.contributionMetrics.set(teamId, currentMetrics);
  }

  /**
   * Generate team performance report
   */
  generateTeamReport(teamId: string): ContributionMetrics & {
    recommendations: string[];
    achievements: string[];
    nextSteps: string[];
  } {
    const metrics = this.contributionMetrics.get(teamId);
    const team = this.teams.get(teamId);

    if (!metrics || !team) {
      throw new Error(`Team ${teamId} not found`);
    }

    return {
      ...metrics,
      recommendations: this.generateRecommendations(metrics, team),
      achievements: this.identifyAchievements(metrics, team),
      nextSteps: this.suggestNextSteps(metrics, team),
    };
  }

  /**
   * Update team skill level based on contributions
   */
  updateTeamSkillLevel(teamId: string): void {
    const metrics = this.contributionMetrics.get(teamId);
    const team = this.teams.get(teamId);

    if (!metrics || !team) return;

    const newSkillLevel = this.calculateSkillLevel(metrics);
    if (newSkillLevel !== team.skillLevel) {
      team.skillLevel = newSkillLevel;
      this.teams.set(teamId, team);

      // Update onboarding plan with new skill level
      const updatedPlan = this.createOnboardingPlan(team);
      this.onboardingPlans.set(teamId, updatedPlan);
    }
  }

  /**
   * Get personalized learning path
   */
  getPersonalizedLearningPath(teamId: string): TrainingModule[] {
    const team = this.teams.get(teamId);
    const metrics = this.contributionMetrics.get(teamId);

    if (!team) return [];

    const weakAreas = this.identifyWeakAreas(metrics);
    const recommendedModules = this.getTargetedTraining(
      team.skillLevel,
      weakAreas
    );

    return recommendedModules;
  }

  /**
   * Schedule team check-in
   */
  scheduleCheckIn(
    _teamId: string,
    type: 'weekly' | 'monthly' | 'milestone'
  ): ProgressCheckpoint {
    const team = this.teams.get(teamId);
    if (!team) throw new Error(`Team ${teamId} not found`);

    const checkpoint: ProgressCheckpoint = {
      id: `${teamId}-${type}-${Date.now()}`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Check-in`,
      description: `Regular progress review for ${team.teamName}`,
      dueDate: this.calculateCheckInDate(type),
      completionCriteria: this.getCheckInCriteria(type, team),
      reviewRequired: true,
      reviewer: team.primaryContact,
    };

    return checkpoint;
  }

  // Private helper methods
  private getRelevantTraining(
    skillLevel: TeamProfile['skillLevel'],
    focusAreas: string[]
  ): TrainingModule[] {
    const allModules: TrainingModule[] = [
      {
        id: 'ds-basics',
        title: 'Design System Fundamentals',
        description:
          'Introduction to design systems and our specific implementation',
        duration: '2 hours',
        type: 'interactive',
        prerequisites: [],
        skillLevel: 'beginner',
        completionCriteria: [
          'Complete interactive tutorial',
          'Pass knowledge check',
        ],
      },
      {
        id: 'component-dev',
        title: 'Component Development',
        description: 'Building and testing components in our design system',
        duration: '4 hours',
        type: 'workshop',
        prerequisites: ['ds-basics'],
        skillLevel: 'intermediate',
        completionCriteria: [
          'Build sample component',
          'Write tests',
          'Create documentation',
        ],
      },
      {
        id: 'advanced-patterns',
        title: 'Advanced Component Patterns',
        description:
          'Complex component architectures and optimization techniques',
        duration: '6 hours',
        type: 'workshop',
        prerequisites: ['component-dev'],
        skillLevel: 'advanced',
        completionCriteria: [
          'Implement complex component',
          'Optimize performance',
          'Mentor others',
        ],
      },
      {
        id: 'testing-strategies',
        title: 'Testing Strategies',
        description:
          'Comprehensive testing approaches for design system components',
        duration: '3 hours',
        type: 'workshop',
        prerequisites: ['component-dev'],
        skillLevel: 'intermediate',
        completionCriteria: [
          'Write unit tests',
          'Create visual regression tests',
          'Set up accessibility tests',
        ],
      },
    ];

    return allModules.filter((module) => {
      const skillMatch = this.isSkillLevelAppropriate(
        module.skillLevel,
        skillLevel
      );
      const focusMatch = focusAreas.some(
        (area) =>
          module.title.toLowerCase().includes(area) ||
          module.description.toLowerCase().includes(area)
      );
      return skillMatch && (focusMatch || module.skillLevel === 'beginner');
    });
  }

  private assignMentor(team: TeamProfile): MentorAssignment {
    // This would integrate with a mentor database
    const mentors = [
      {
        mentorId: 'mentor-1',
        mentorName: 'Sarah Chen',
        expertise: ['components', 'testing'],
        availability: 'Weekdays 9-5 PST',
        communicationPreference: 'slack',
        meetingSchedule: 'Weekly 1-hour sessions',
      },
      {
        mentorId: 'mentor-2',
        mentorName: 'Alex Rodriguez',
        expertise: ['themes', 'documentation'],
        availability: 'Weekdays 10-6 EST',
        communicationPreference: 'email',
        meetingSchedule: 'Bi-weekly 1-hour sessions',
      },
    ];

    // Simple matching based on focus areas
    const bestMatch =
      mentors.find((mentor) =>
        mentor.expertise.some((exp) => team.focusAreas.includes(exp as any))
      ) || mentors[0];

    return bestMatch;
  }

  private suggestStarterTasks(team: TeamProfile): StarterTask[] {
    const tasks: StarterTask[] = [
      {
        id: 'first-component',
        title: 'Create Your First Component',
        description: 'Build a simple component following our guidelines',
        difficulty: 'easy',
        estimatedTime: '2-4 hours',
        learningObjectives: [
          'Understand component structure',
          'Follow coding standards',
          'Write basic tests',
        ],
        resources: [
          {
            title: 'Component Template',
            type: 'template',
            url: '/templates/component',
            description: 'Starter template for new components',
          },
        ],
        acceptanceCriteria: [
          'Component renders correctly',
          'Tests pass',
          'Documentation is complete',
        ],
      },
      {
        id: 'fix-documentation',
        title: 'Improve Documentation',
        description: 'Find and fix a documentation issue',
        difficulty: 'easy',
        estimatedTime: '1-2 hours',
        learningObjectives: [
          'Understand documentation standards',
          'Learn contribution workflow',
        ],
        resources: [
          {
            title: 'Documentation Guide',
            type: 'documentation',
            url: '/docs/writing-guide',
            description: 'How to write good documentation',
          },
        ],
        acceptanceCriteria: [
          'Documentation is clear and accurate',
          'Follows style guide',
          'Includes examples',
        ],
      },
    ];

    return tasks.filter((task) =>
      team.skillLevel === 'beginner' ? task.difficulty === 'easy' : true
    );
  }

  private createProgressCheckpoints(team: TeamProfile): ProgressCheckpoint[] {
    const checkpoints: ProgressCheckpoint[] = [
      {
        id: 'week-1',
        title: 'Week 1 Check-in',
        description: 'Initial progress review',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        completionCriteria: [
          'Complete basic training',
          'Set up development environment',
        ],
        reviewRequired: true,
        reviewer: team.primaryContact,
      },
      {
        id: 'month-1',
        title: 'Month 1 Milestone',
        description: 'First month progress evaluation',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        completionCriteria: [
          'Complete first contribution',
          'Demonstrate understanding of processes',
        ],
        reviewRequired: true,
        reviewer: team.primaryContact,
      },
    ];

    return checkpoints;
  }

  private calculateDuration(skillLevel: TeamProfile['skillLevel']): string {
    switch (skillLevel) {
      case 'beginner':
        return '4-6 weeks';
      case 'intermediate':
        return '2-3 weeks';
      case 'advanced':
        return '1-2 weeks';
      default:
        return '3-4 weeks';
    }
  }

  private getCustomResources(team: TeamProfile): Resource[] {
    const resources: Resource[] = [
      {
        title: 'Team Slack Channel',
        type: 'tool',
        url: `#team-${team.teamId}`,
        description: 'Dedicated channel for your team',
      },
      {
        title: 'Team Dashboard',
        type: 'tool',
        url: `/dashboard/team/${team.teamId}`,
        description: "Track your team's progress and metrics",
      },
    ];

    // Add focus-area specific resources
    if (team.focusAreas.includes('components')) {
      resources.push({
        title: 'Component Development Guide',
        type: 'documentation',
        url: '/docs/component-development',
        description: 'Comprehensive guide to building components',
      });
    }

    return resources;
  }

  private initializeMetrics(teamId: string): ContributionMetrics {
    return {
      teamId,
      period: { start: new Date(), end: new Date() },
      metrics: {
        contributionsCount: 0,
        averageReviewTime: 0,
        qualityScore: 0,
        adoptionRate: 0,
        feedbackScore: 0,
        completedTasks: 0,
        activeMembers: 0,
      },
      trends: {
        contributionTrend: 'stable',
        qualityTrend: 'stable',
        engagementTrend: 'medium',
      },
    };
  }

  private generateRecommendations(
    metrics: ContributionMetrics,
    team: TeamProfile
  ): string[] {
    const recommendations: string[] = [];

    if (metrics.metrics.qualityScore < 70) {
      recommendations.push(
        'Focus on code quality - consider additional training on testing and best practices'
      );
    }

    if (metrics.metrics.averageReviewTime > 48) {
      recommendations.push(
        'Work on reducing review time by following PR guidelines more closely'
      );
    }

    if (metrics.metrics.adoptionRate < 50) {
      recommendations.push(
        'Engage more with the community to understand needs and improve contribution relevance'
      );
    }

    return recommendations;
  }

  private identifyAchievements(
    metrics: ContributionMetrics,
    team: TeamProfile
  ): string[] {
    const achievements: string[] = [];

    if (metrics.metrics.contributionsCount >= 10) {
      achievements.push('🎉 Reached 10+ contributions milestone');
    }

    if (metrics.metrics.qualityScore >= 90) {
      achievements.push('⭐ Excellent code quality score');
    }

    if (metrics.metrics.adoptionRate >= 80) {
      achievements.push('🚀 High adoption rate for contributions');
    }

    return achievements;
  }

  private suggestNextSteps(
    metrics: ContributionMetrics,
    team: TeamProfile
  ): string[] {
    const nextSteps: string[] = [];

    if (
      team.skillLevel === 'beginner' &&
      metrics.metrics.contributionsCount >= 5
    ) {
      nextSteps.push('Consider advancing to intermediate-level tasks');
    }

    if (metrics.metrics.qualityScore >= 85) {
      nextSteps.push('Explore mentoring other teams');
    }

    nextSteps.push('Continue regular contributions to maintain momentum');

    return nextSteps;
  }

  private calculateSkillLevel(
    metrics: ContributionMetrics
  ): TeamProfile['skillLevel'] {
    const score = metrics.metrics.qualityScore;
    const contributions = metrics.metrics.contributionsCount;

    if (score >= 85 && contributions >= 15) return 'advanced';
    if (score >= 70 && contributions >= 5) return 'intermediate';
    return 'beginner';
  }

  private identifyWeakAreas(metrics?: ContributionMetrics): string[] {
    if (!metrics) return [];

    const weakAreas: string[] = [];

    if (metrics.metrics.qualityScore < 70) weakAreas.push('testing');
    if (metrics.metrics.averageReviewTime > 48) weakAreas.push('documentation');
    if (metrics.metrics.adoptionRate < 50) weakAreas.push('components');

    return weakAreas;
  }

  private getTargetedTraining(
    skillLevel: TeamProfile['skillLevel'],
    weakAreas: string[]
  ): TrainingModule[] {
    // This would return training modules targeted at weak areas
    return [];
  }

  private isSkillLevelAppropriate(
    moduleLevel: string,
    teamLevel: string
  ): boolean {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const moduleIndex = levels.indexOf(moduleLevel);
    const teamIndex = levels.indexOf(teamLevel);

    return moduleIndex <= teamIndex + 1; // Allow one level above current
  }

  private calculateCheckInDate(type: 'weekly' | 'monthly' | 'milestone'): Date {
    const now = new Date();
    switch (type) {
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      case 'milestone':
        return new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    }
  }

  private getCheckInCriteria(type: string, _team: TeamProfile): string[] {
    const baseCriteria = [
      'Review progress',
      'Discuss challenges',
      'Plan next steps',
    ];

    if (type === 'milestone') {
      baseCriteria.push('Evaluate skill progression', 'Update learning path');
    }

    return baseCriteria;
  }
}

// Export singleton instance
export const teamOnboardingManager = new TeamOnboardingManager();
