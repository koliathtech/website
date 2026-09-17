"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_REFERRAL_RULES = void 0;
exports.isSourceApp = isSourceApp;
exports.getRule = getRule;
exports.listPublicRules = listPublicRules;
exports.APP_REFERRAL_RULES = {
    sapient: {
        app: "sapient",
        label: "Sapient",
        description: "Points confirm only after the referred person downloads Sapient and stays active for one full day (24 hours of genuine use).",
        confirmOn: "day_active",
        points: 100,
        trackPendingOnSignup: true,
    },
    adverts: {
        app: "adverts",
        label: "Adverts",
        description: "Points confirm only after the referred person downloads Adverts and completes a successful purchase. Purchase wiring ships in a later release.",
        confirmOn: "purchase",
        points: 100,
        trackPendingOnSignup: true,
    },
    adverts_rewards: {
        app: "adverts_rewards",
        label: "Adverts Rewards",
        description: "Points confirm after the referred viewer installs and completes their first verified watch session.",
        confirmOn: "day_active",
        points: 50,
        trackPendingOnSignup: true,
    },
    advert_cohort: {
        app: "advert_cohort",
        label: "Advert Cohort",
        description: "Points confirm after the referred talent creates a profile and sets a rate card.",
        confirmOn: "day_active",
        points: 75,
        trackPendingOnSignup: true,
    },
    diabetic: {
        app: "diabetic",
        label: "Diabetic Buddy",
        description: "Points confirm after the referred person signs up and completes first-day onboarding in Diabetic Buddy.",
        confirmOn: "signup",
        points: 100,
        trackPendingOnSignup: true,
    },
};
function isSourceApp(value) {
    return value in exports.APP_REFERRAL_RULES;
}
function getRule(app) {
    return exports.APP_REFERRAL_RULES[app];
}
function listPublicRules() {
    return Object.values(exports.APP_REFERRAL_RULES).map((r) => ({
        app: r.app,
        label: r.label,
        description: r.description,
        confirmOn: r.confirmOn,
        points: r.points,
    }));
}
