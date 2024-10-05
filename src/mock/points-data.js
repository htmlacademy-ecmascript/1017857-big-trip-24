import { getRandomElement } from '../utilites/utils';
import { nanoid } from 'nanoid';

const pointsData = [
  {
    'base_price': 1500,
    'date_from': '2024-10-20T22:55:56.845Z',
    'date_to': '2024-10-22T09:22:13.375Z',
    'destination': 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    'is_favorite': false,
    'offers': [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'i68kn1fy-vu6y-i0wo-xejv-m6fu0sx8njih',
      'kirzg5it-4l5b-bzab-ax6j-bg3009ugj7tg'
    ],
    'type': 'taxi'
  },
  {
    'base_price': 2100,
    'date_from': '2024-09-13T10:55:56.845Z',
    'date_to': '2024-09-30T11:22:13.375Z',
    'destination': 'qthxu1kk-fzd9-0te7-9r3g-j0onvu7uzvqr',
    'is_favorite': true,
    'offers': [
      'c8iplez6-r9vb-ce6h-2zd0-379i08bde2n8',
      '9fa92592-9304-4ee5-a7ff-ff4a9bc30fc6',
      '26111e09-cdbc-4156-af31-75f287d9b799'
    ],
    'type': 'train'
  },
  {
    'base_price': 1800,
    'date_from': '2019-07-10T06:55:56.845Z',
    'date_to': '2019-07-11T05:22:13.375Z',
    'destination': 'ik84hyo8-mki7-szaa-fvqt-ed3f1lz3o8cz',
    'is_favorite': false,
    'offers': [
      'kirzg5it-4l5b-bzab-ax6j-bg3009ugj7tg'
    ],
    'type': 'bus'
  },
  {
    'base_price': 2800,
    'date_from': '2024-11-10T06:55:56.845Z',
    'date_to': '2024-11-11T05:22:13.375Z',
    'destination': 'qthxu1kk-fzd9-0te7-9r3g-j0onvu7uzvqr',
    'is_favorite': true,
    'offers': [
      '2db2e669-cd94-4b13-987c-a9b23b94d5b7',
      '953c360a-678d-4522-ba97-a28f553adbb2'
    ],
    'type': 'flight'
  },
  {
    'base_price': 2200,
    'date_from': '2024-11-23T06:55:56.845Z',
    'date_to': '2024-11-25T05:22:13.375Z',
    'destination': 'heqqq4fm-oolb-6tgl-1xwe-hhutu0ah1r6k',
    'is_favorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'base_price': 3200,
    'date_from': '2024-12-23T06:55:56.845Z',
    'date_to': '2024-12-25T05:22:13.375Z',
    'destination': 'ik84hyo8-mki7-szaa-fvqt-ed3f1lz3o8cz',
    'is_favorite': true,
    'offers': [
      '35d0e171-b3f2-45e8-8314-4660f0d09448',
      '9fa92592-9304-4ee5-a7ff-ff4a9bc30fc6',
      '43106a55-2fc2-42cb-9431-aba23e7b9f1f',
      '67e6e41b-e2b3-4d62-a561-e17025935615'
    ],
    'type': 'ship'
  }
];

const getRandomPointData = () => ({
  id: nanoid(),
  ...getRandomElement(pointsData)
});

export { getRandomPointData };
