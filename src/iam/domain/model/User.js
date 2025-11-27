import { UserType } from "./UserType.js";

export class User {
    constructor({
                    id = '',
                    subscriptionId = '',
                    fullName = '',
                    email = '',
                    password = '',
                    phone = '',
                    address = '',
                    city = '',
                    country = '',
                    isVerified = false,
                    type = UserType.CUSTOMER
                } = {}) {
        this.id = id;
        this.subscriptionId = subscriptionId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.country = country;
        this.isVerified = isVerified;
        this.type = type;
    }

    isProducer() {
        return this.type === UserType.PRODUCER;
    }

    isCustomer() {
        return this.type === UserType.CUSTOMER;
    }
}