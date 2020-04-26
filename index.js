"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const env = pulumi.getStack();

const dynamo_flights = new aws.dynamodb.Table(`${env}-flights`, {
    name: `${env}-flights`,
    attributes: [
        {
            name: "id",
            type: "S"
        },
        {
            name: "has_free_seats",
            type: "N"
        },
        {
            name: "departure",
            type: "S"
        }
    ],
    hashKey: "id",
    readCapacity: 1,
    writeCapacity: 1,
    tags: {
        Environment: env,
    },
    globalSecondaryIndexes: [
        {
            name: "by_has_free_seats_and_departure",
            projectionType: "ALL",
            hashKey: "has_free_seats",
            rangeKey: "departure",
            readCapacity: 2,
            writeCapacity: 2,
        },
    ]
});

module.exports = {

    dynamo_flights_name: dynamo_flights.name,
    dynamo_flights_arn: dynamo_flights.arn

}