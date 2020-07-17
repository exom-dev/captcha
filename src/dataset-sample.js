const sample = [
  {
    category: 'bicycle',
    data: [
      'ed567ca4-cfcd-424d-8d8b-552b7a5a7fcc',
      'ea7fb281-7489-45aa-a576-ef5d8b130faa',
      '6594face-6261-4e2c-b8c1-8f873d130857',
      '3042eb05-2622-4ecd-abde-87edbd184a8c',
      '3d933b5f-c670-4c31-b144-04c57ef6ca56',
      '1723a761-3259-40b6-9e4d-cc734d059b7e',
      '38d15b7d-8587-4576-818d-bc4d80e1b1c3',
      'fbfe5106-3e8d-4439-9c1f-31a6cd6bf551',
      '426bd875-8b8a-479a-b110-142d56605f22',
      '96618805-8c83-48a1-9644-23f80fd1d252'
    ]
  },
  {
    category: 'bus',
    data: [
      '6e7a1b10-ef9a-464b-b347-2e9a341f79e7',
      '4220fb15-40a6-4a2e-9575-8762cc3f0e2d',
      'ee20ada2-051c-498d-81f9-d4ce8db43ec1',
      'b739235e-4d98-4890-a3d5-bbc6ce2eac87',
      'ce4f0b91-14b6-4254-8862-6d38ba59e727',
      'c1d14242-0a22-4ed2-8437-9d7780c3acb0',
      '9615f88c-5a3d-4d93-99b6-f7b43f0a3aa9',
      '3a7253e8-3006-4561-b2d1-081c208b1be1',
      '250be236-e47d-4260-be54-0830e813f2ab',
      'bd2de488-4c54-4df4-89d7-f3488a8b0f05'
    ]
  },
  {
    category: 'car',
    data: [
      '873b0d44-e197-46a4-9b26-98350dfa2df7',
      'c0e02018-2359-4ec4-8e12-75da9e3d4ce2',
      'ee68f00a-2a84-438a-8766-46b0bc47c162',
      '0abb596a-2eed-4468-af2f-3877854884a7',
      '5bdb7c00-2629-4a07-8224-c59e6fba7730',
      '72e25743-7632-418d-930b-ff5f8ba969df',
      '387f814b-5bab-4fa2-b768-bc5abbc9596a',
      '05ad83cc-5024-479e-99d9-75794d584a65',
      '12cef29a-fefd-4f64-b5e6-331ef54d210d',
      '1c319a0c-d059-4c99-9ad3-7bd7124369eb'
    ]
  },
  {
    category: 'chimney',
    data: [
      'bddf391f-34c4-4c02-a581-b144dabe22d4',
      '2992dcda-0f37-4f2a-8fba-e8bbeaddaa70',
      'a79814a3-915f-430c-a50a-ff632c2ff894',
      'dcb6cf99-ade7-48d0-b338-80306fd82a2a',
      'd477c8ea-3734-4b5a-82b7-9585261e2c03',
      '85ae67c1-e3fe-4390-987c-8830190fd0ab',
      'e3de497d-6917-490d-ae8c-01134d0d92e0',
      'ab68df2f-45a6-4680-a68c-f1304e4e9656',
      '7993e889-f9b9-492f-b1c7-9a2b62448dd4',
      '9165fd80-c5c5-4fc3-8e16-35f8ff76f52c'
    ]
  },
  {
    category: 'crosswalk',
    data: [
      'e9441b19-7a05-4bc8-bb03-08ff048bac9f',
      '7dd84ab2-c2c1-4682-95a4-1df37170fcec',
      'fe5b8329-dd2e-4cd2-9faf-8bf7c486ecaa',
      '815fdea9-7535-47f9-91a5-e1337081fdee',
      '57093b7b-9553-4e48-a367-1d274c3e3b64',
      '51c7cbc2-1f1c-4884-9822-653e7445d928',
      'e9762190-33f2-43cb-8de5-3546a8df4859',
      'eb55e463-487b-4ab7-bbca-b0d4124cc151',
      '0608ac4c-c63b-43e9-9f0e-0d541748aef5',
      'cc60a1ce-b894-4436-bf81-89f159a26c86'
    ]
  },
  {
    category: 'hydrant',
    data: [
      '2c951f0c-ebca-4f59-9d0e-1534e2acb2e4',
      '239d4a14-dcbd-44ec-937d-6b1899193500',
      '018e63c7-4e05-4c54-ba78-1f9ef8dec486',
      '878923ab-1a48-4812-a8d9-44f2d3bc5163',
      '82e1660f-fcee-44e9-a510-fd14abc5dd43',
      'd6def367-e20f-44cb-8443-359b299ccbe3',
      'bc0f6b95-ddb1-451e-910c-c3af459cdb75',
      '9b1b83a3-2c58-4d3f-b6d8-3f33cc58489e',
      '22fb4d47-d592-42a1-bce9-f236e7b41cec',
      '7c3462ec-94d1-4706-b7f0-13f252490e0d'
    ]
  },
  {
    category: 'motorcycle',
    data: [
      'f0dc1ac2-fdb2-4c40-9adb-f73408fdc146',
      'e22c1cda-07d4-4a76-a80f-3defdc3cd90a',
      'f614c617-9a30-4595-9e17-e1985bba6413',
      '2ade8066-3def-4c73-9b37-d8e1635cc8c6',
      '1f618c52-ee18-40b3-a5a7-a47795918c33',
      'a93451a5-094e-4e31-a076-ee08e2a5c107',
      'fb536e46-0a2a-4d87-ac5d-12faa113c60d',
      '5405cbf3-69b2-46b3-ad42-fb69e9c50bdf',
      'af6bcd7b-a562-489f-9bb7-886c99d512d6',
      '226cca30-8753-41ec-8641-a98127b2763d'
    ]
  },
  {
    category: 'palm tree',
    data: [
      'fb5041de-e678-43e7-9eb0-564cec680c14',
      'd87c6006-a83a-4d8e-9627-6da12a7c448d',
      '01415616-bb04-47a0-84a1-27f496b40f0a',
      '4fe415de-5c59-4180-802a-abb3b3774dae',
      '22ad750d-d4c8-46d9-9463-d4e8fec3d3af',
      'bd7ee322-92f0-4df6-a9c5-44e59fd290cb',
      '13360810-ee13-427c-b76e-1a0ae4c2cb31',
      '55c6686c-a918-4961-bd7d-3580298afc7d',
      '79889372-f555-47e3-9a5d-484b2890499d',
      'cd487c3d-c184-47ab-9da8-1a83ac689e64'
    ]
  },
  {
    category: 'traffic light',
    data: [
      'a617b02f-bf1b-4ffb-afe9-cc23e6fbff52',
      '88122780-1c4f-492d-a6eb-958ffc0d5576',
      '2fbfe7aa-c2c1-40bc-856b-2a95afacd3d2',
      '4cce91a9-dd8a-402a-8859-32f432468753',
      '91ac734c-8be4-4512-9c10-437e6aae5c4c',
      'ea31c74d-5e92-4d80-aac7-aa499971a807',
      'a6617578-fad2-45c7-b8ec-acc1f21f647b',
      '2211d01a-2bbd-4e96-bc41-cd4ebd874f82',
      '97327192-03fa-42a4-b214-dd291e08547f',
      '3127755a-2f36-4a61-bcbb-3422251eec7e'
    ]
  }
];

module.exports = sample;
