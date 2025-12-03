import { faker } from '@faker-js/faker';

export class DataGenerator {

    static randomEmail(): string {
        const unique = Math.random().toString(36).substring(2, 10);
        return `user_${unique}@test.com`;
    }

    static randomName(): string {
        //const unique = Math.random().toString(36).substring(2, 7);
        return faker.person.firstName().toLowerCase();
    }

    static randomPassword(): string {
        return "Pass@" + Math.floor(10000 + Math.random() * 90000);
    }
}