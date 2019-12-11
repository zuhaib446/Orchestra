exports.schema = {
  AttributeDefinitions: [
    {
      AttributeName: 'SAMPLE_ID',
      AttributeType: 'N'
    },
    {
      AttributeName: 'SAMPLE_NAME',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'SAMPLE_ID',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'SAMPLE_NAME',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  StreamSpecification: {
    StreamEnabled: false
  }
};
