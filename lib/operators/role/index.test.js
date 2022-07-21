'use strict';

const qExpression = require('../../index');

describe('|role', () => {
    describe('.any', () => {
        describe('Given a series of context ids', () => {
            it('should return true if any of the context ids are active', () => {
                // prettier-ignore
                const expression = ['|role.any', "foo", "bar", "baz"];
                const data = {
                    attributes: {
                        q__roles: {
                            foo: {
                                schema: {
                                    const: ['==', '$.answers.p-foo.q-foo', true]
                                }
                            },
                            bar: {
                                schema: {
                                    const: ['==', '$.answers.p-bar.q-bar', true]
                                }
                            },
                            baz: {
                                schema: {
                                    const: ['==', '$.answers.p-baz.q-baz', true]
                                }
                            }
                        }
                    },
                    answers: {
                        'p-bar': {
                            'q-bar': true
                        },
                        'p-baz': {
                            'q-baz': false
                        }
                    }
                };
                const result = qExpression.evaluate(expression, data);

                expect(result).toEqual(true);
            });

            it('should return false if none of the context ids are active', () => {
                // prettier-ignore
                const expression = ['|role.any', "foo", "bar", "baz"];
                const data = {
                    attributes: {
                        q__roles: {
                            foo: {
                                schema: {
                                    const: ['==', '$.answers.p-foo.q-foo', true]
                                }
                            },
                            bar: {
                                schema: {
                                    const: ['==', '$.answers.p-bar.q-bar', true]
                                }
                            },
                            baz: {
                                schema: {
                                    const: ['==', '$.answers.p-baz.q-baz', true]
                                }
                            }
                        }
                    },
                    answers: {
                        'p-bar': {
                            'q-bar': false
                        },
                        'p-baz': {
                            'q-baz': false
                        }
                    }
                };
                const result = qExpression.evaluate(expression, data);

                expect(result).toEqual(false);
            });
        });
    });

    describe('.all', () => {
        describe('Given a series of context ids', () => {
            it('should return true if all of the context ids are active', () => {
                // prettier-ignore
                const expression = ['|role.all', "bar", "baz"];
                const data = {
                    attributes: {
                        q__roles: {
                            foo: {
                                schema: {
                                    const: ['==', '$.answers.p-foo.q-foo', true]
                                }
                            },
                            bar: {
                                schema: {
                                    const: ['==', '$.answers.p-bar.q-bar', true]
                                }
                            },
                            baz: {
                                schema: {
                                    const: ['==', '$.answers.p-baz.q-baz', true]
                                }
                            }
                        }
                    },
                    answers: {
                        'p-bar': {
                            'q-bar': true
                        },
                        'p-baz': {
                            'q-baz': true
                        }
                    }
                };
                const result = qExpression.evaluate(expression, data);

                expect(result).toEqual(true);
            });

            it('should return false if any of the context ids are not active', () => {
                // prettier-ignore
                const expression = ['|role.all', "bar", "baz"];
                const data = {
                    attributes: {
                        q__roles: {
                            foo: {
                                schema: {
                                    const: ['==', '$.answers.p-foo.q-foo', true]
                                }
                            },
                            bar: {
                                schema: {
                                    const: ['==', '$.answers.p-bar.q-bar', true]
                                }
                            },
                            baz: {
                                schema: {
                                    const: ['==', '$.answers.p-baz.q-baz', true]
                                }
                            }
                        }
                    },
                    answers: {
                        'p-bar': {
                            'q-bar': true
                        },
                        'p-baz': {
                            'q-baz': false
                        }
                    }
                };
                const result = qExpression.evaluate(expression, data);

                expect(result).toEqual(false);
            });
        });
    });
});
