/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  collection,
  doc,
  getDoc,
  Firestore,
  getCountFromServer,
  onSnapshot,
  QuerySnapshot
} from 'firebase/firestore';

import { log } from './common/logging.js';
import { TestEnvironment } from './common/test_environment.js';
import { SnapshotListener, createDocuments } from './common/util.js';

export async function runTheTest(
  db: Firestore,
  env: TestEnvironment
): Promise<void> {
  // Googlers see b/325591749 for the full issue description.
  const collectionRef = collection(db, 'ThrottledWebChannelDeathBug325591749');

  // Uncomment the line below on first run to populate the collection.
  // On subsequent runs, comment this line out and throttle the network
  // connection to 10Mbit down, 10Mbit up, and 20ms latency before pressing Run
  // to reproduce the problem.
  //await createDocuments(collectionRef, 1000, data);

  // Prime the connection with the backend, to avoid the 10-second timeout
  // experienced by the snapshot listener when establishing the initial
  // connection with the backend.
  //log("Priming connection to the backend by retrieving a non-existent document");
  //await getDoc(doc(collectionRef));

  log(`Counting the documents in collection: ${collectionRef.path}`);
  const countSnapshot = await getCountFromServer(collectionRef);
  log(
    `Collection ${collectionRef.path} contains ${
      countSnapshot.data().count
    } documents`
  );

  log(`onSnapshot(${collectionRef.path})`);
  const snapshotListener = new SnapshotListener<QuerySnapshot>(
    env.cancellationToken
  );
  const unsubscribe = onSnapshot(
    collectionRef,
    { includeMetadataChanges: true },
    snapshotListener.observer
  );
  env.cancellationToken.onCancelled(unsubscribe);

  // Wait for a snapshot
  {
    const waitOptions = {
      fromCache: false,
      hasPendingWrites: false
    };
    log(`waitForSnapshot(${JSON.stringify(waitOptions)})`);
    const snapshot = await snapshotListener.waitForSnapshot(waitOptions);
    log(`Got snapshot with ${snapshot.size} documents`);
    env.cancellationToken.throwIfCancelled();
  }
}

const data = {
  'documentChange': {
    'document': {
      'name':
        'projects/bringy-5a67a/databases/(default)/documents/products/0C7T4j0daaMQRvS2ASgL',
      'fields': {
        'category': { 'stringValue': '50' },
        'subCategory': { 'stringValue': 'wB9MKF93HjSzqmFIppY8' },
        'lastInventoryTime': { 'timestampValue': '2023-02-27T09:24:06.387Z' },
        'barcodes': {
          'arrayValue': { 'values': [{ 'stringValue': '7290004125585' }] }
        },
        'warehouse': { 'stringValue': 'UEF' },
        'quantity': { 'integerValue': '0' },
        'storePosition': { 'stringValue': 'G43' },
        'uploadImageKey': { 'nullValue': null },
        'supplierIds': {
          'arrayValue': {
            'values': [{ 'stringValue': 'agvAjUm5PvxBi3IIKjie' }]
          }
        },
        'quantityLimitForCustomer': { 'integerValue': '0' },
        'taxExempt': { 'booleanValue': false },
        'searchKeywords': {
          'arrayValue': {
            'values': [
              { 'stringValue': 'aaa' },
              { 'stringValue': 'bbb' },
              { 'stringValue': 'ccc' },
              { 'stringValue': 'ddd' },
              { 'stringValue': 'eee' },
              { 'stringValue': 'fff' },
              { 'stringValue': 'ggg' },
              { 'stringValue': 'hhh' },
              { 'stringValue': 'iii' },
              { 'stringValue': 'jjj' },
              { 'stringValue': 'ALTERNATIVE' },
              { 'stringValue': 'kkk' },
              { 'stringValue': 'lll' },
              { 'stringValue': 'mmm' },
              { 'stringValue': 'nnn' },
              { 'stringValue': 'ooo' },
              { 'stringValue': 'ppp' },
              { 'stringValue': 'qqq' },
              { 'stringValue': 'rrr' },
              { 'stringValue': 'sss' },
              { 'stringValue': 'ttt' },
              { 'stringValue': 'uuu' },
              { 'stringValue': 'vvv' },
              { 'stringValue': 'www' },
              { 'stringValue': 'xxx' },
              { 'stringValue': 'yyy' },
              { 'stringValue': 'zzz' },
              { 'stringValue': 'AAA' },
              { 'stringValue': 'BBB' },
              { 'stringValue': 'CCC' },
              { 'stringValue': 'DDD' },
              { 'stringValue': 'EEE' },
              { 'stringValue': 'FFF' },
              { 'stringValue': 'GGG' },
              { 'stringValue': 'HHH' }
            ]
          }
        },
        'description': { 'stringValue': '' },
        'active': { 'booleanValue': false },
        'barcode': { 'stringValue': '7290004125585' },
        'priceDescription': { 'stringValue': '' },
        'quantityIsLimitedForCustomer': { 'booleanValue': false },
        'id': { 'stringValue': '0C7T4j0daaMQRvS2ASgL' },
        'masterProductRelation': {
          'mapValue': {
            'fields': {
              'promotionOptionsOverride': {
                'mapValue': {
                  'fields': { 'freesDeliveryFees': { 'booleanValue': false } }
                }
              },
              'masterProduct': { 'stringValue': 'XBnh9x2ld0Vvuvz4LH3B' },
              'taxExemptOverride': { 'booleanValue': false },
              'productSetsDiscount': { 'booleanValue': false },
              'productSetsQuantityLimit': { 'booleanValue': false },
              'discountPriceX100Override': { 'integerValue': '0' },
              'quantityIsLimitedForCustomerOverride': { 'booleanValue': false },
              'discountActiveOverride': { 'booleanValue': false },
              'productSetsPriceX100AndTax': { 'booleanValue': false },
              'productSetsPromotionOptions': { 'booleanValue': false },
              'priceX100Override': { 'integerValue': '0' },
              'quantityLimitForCustomerOverride': { 'integerValue': '0' },
              'productSetsPriceX100': { 'booleanValue': false }
            }
          }
        },
        'priceX100': { 'integerValue': '1190' },
        'descriptionLocalized': {
          'mapValue': { 'fields': { 'he': { 'stringValue': '' } } }
        },
        'title': { 'stringValue': 'HHH' },
        'image': { 'stringValue': '' },
        'minimumCustomersAge': { 'integerValue': '0' },
        'discountPriceX100': { 'integerValue': '990' },
        'quantityLastInventory': { 'integerValue': '4' },
        'updatedAt': { 'timestampValue': '2023-03-12T08:37:58.209Z' },
        'titleLocalized': {
          'mapValue': {
            'fields': {
              'he': { 'stringValue': 'III' },
              'en': { 'stringValue': 'Soya drink - Vanilla 1 Lt' }
            }
          }
        },
        'imageType': { 'stringValue': 'masterproduct_by_id_webp' },
        'rank': { 'integerValue': '1' },
        'discountActive': { 'booleanValue': true },
        'lastImageUpdateTime': { 'timestampValue': '2024-01-17T11:23:06.527Z' }
      },
      'createTime': '2023-01-05T09:07:15.818219Z',
      'updateTime': '2024-02-13T14:00:47.370142Z'
    },
    'targetIds': [2]
  }
};
