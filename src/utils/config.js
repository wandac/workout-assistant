const Constants = {
    // wger test credentials for https://wger.de/en/user/login
    WGER_USER: "test.dev",
    WGER_PASS: "test123",

    WGER_API_KEY: "53a73005874c3695a00755f3dd6470413b5b39fa",
    WGER_API_PATH: "https://wger.de/api/v2/",
    WGER_WORKOUT_ENDPOINT: "workout/?ordering=-id",
    WGER_WORKOUT_BY_ID_ENDPOINT: "workout/<id>/canonical_representation/",
    WGER_EXERCISE_IMAGE_ENDPOINT: "exerciseimage/<id>/thumbnails/",
    WGER_DAY_ENDPOINT: "day/",
    WGER_EXERCISE_ENDPOINT: "exercise/?language=2&status=2",

    // HTTP communication outcome
    RESPONSE_RECEIVED: 'RESPONSE_RECEIVED',
    API_CALL_COMPLETED: 'API_CALL_COMPLETED',

    // Screen names - for navigation
    HOME_SCREEN: 'Home',
    SEARCH_SCREEN: 'Search',
    WORKOUT_SCREEN: 'Workout',
    WORKOUT_TRAKER_SCREEN: 'Workout traker',
    WORKOUT_DETAILS_SCREEN: 'Workout details',

    // Days of the week - day picker
    MONDAY: 'Monday',
    TUESDAY: 'Tuesday',
    WEDNESDAY: 'Wednesday',
    THURSDAY: 'Thursday',
    FRIDAY: 'Friday',
    SATURDAY: 'Saturday',
    SUNDAY: 'Sunday',
};

export default Constants;