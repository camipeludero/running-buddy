const LEVELS: { [key: number]: string } = {
    1: 'Easy',
    2: 'Medium',
    3: 'Can survive',
    4: 'Hard',
    5: 'Hell'
};

export const getLevel = (n: number) => {
    return LEVELS[n];
};
