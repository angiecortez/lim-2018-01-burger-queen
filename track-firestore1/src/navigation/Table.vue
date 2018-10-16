<template>
  <div id="app">
  <v-app id="inspire">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <p>Patient Selection</p>
          <v-select v-bind:items="items" overflow label="Select" item-value="item" item-text="name" v-model="selected"></v-select>
        </v-flex>
      </v-layout>

      <h3>{{ selected.name }}</h3>
      <v-data-table v-bind:headers="headers" :items="selected.bloodsugars" hide-actions>
        <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.value }}</td>
        <td class="text-xs-right">{{ props.item.time }}</td>
      </template>
      </v-data-table>
    </v-container>
  </v-app>
</div>
</template>
<script>
export default {
  name: 'Table',
    data() {
    return {
      selected: [],
      headers: [
        { text: "Blood Sugar (mg/dl)", value: "value" },
        { text: "Time Taken", value: "time" }
      ],
      items: [
        {
          value: false,
          id: 0,
          name: "Finch Conway",
          age: 49,
          weight: 66,
          height: 61.69,
          bloodsugars: [
            {
              value: 86,
              time: "12/17 02:56:18"
            },
            {
              value: 92,
              time: "12/17 06:12:47"
            },
            {
              value: 98,
              time: "12/08 12:45:01"
            },
            {
              value: 82,
              time: "11/21 05:31:09"
            },
            {
              value: 86,
              time: "11/25 09:35:45"
            },
            {
              value: 83,
              time: "12/02 02:43:38"
            },
            {
              value: 84,
              time: "11/30 05:29:29"
            },
            {
              value: 90,
              time: "12/08 04:27:22"
            },
            {
              value: 98,
              time: "11/28 09:18:24"
            }
          ]
        },
        {
          value: false,
          id: 1,
          name: "Patrick Odonnell",
          age: 37,
          weight: 52,
          height: 64.36,
          bloodsugars: [
            {
              value: 93,
              time: "12/02 07:39:07"
            },
            {
              value: 98,
              time: "12/02 11:47:32"
            },
            {
              value: 93,
              time: "11/30 08:24:25"
            },
            {
              value: 81,
              time: "11/21 09:56:25"
            },
            {
              value: 98,
              time: "12/13 03:03:37"
            },
            {
              value: 99,
              time: "12/24 04:14:42"
            },
            {
              value: 101,
              time: "12/06 12:02:28"
            }
          ]
        },
        {
          value: false,
          id: 2,
          name: "Alyson Finch",
          age: 60,
          weight: 63,
          height: 71.23,
          bloodsugars: [
            {
              value: 90,
              time: "12/17 12:38:49"
            },
            {
              value: 80,
              time: "12/19 09:33:01"
            },
            {
              value: 105,
              time: "12/15 07:42:52"
            },
            {
              value: 92,
              time: "12/24 06:59:48"
            },
            {
              value: 75,
              time: "12/05 05:04:14"
            },
            {
              value: 98,
              time: "12/11 02:22:55"
            },
            {
              value: 79,
              time: "12/17 10:24:27"
            }
          ]
        },
        {
          value: false,
          id: 3,
          name: "Marva Oneil",
          age: 75,
          weight: 32,
          height: 71.9,
          bloodsugars: [
            {
              value: 88,
              time: "12/20 04:36:09"
            },
            {
              value: 85,
              time: "12/15 09:33:38"
            },
            {
              value: 97,
              time: "12/17 09:37:49"
            },
            {
              value: 75,
              time: "11/21 05:29:54"
            },
            {
              value: 99,
              time: "12/04 03:59:08"
            },
            {
              value: 83,
              time: "12/12 07:59:39"
            },
            {
              value: 96,
              time: "11/27 10:28:51"
            }
          ]
        },
        {
          value: false,
          id: 4,
          name: "Mavis Mcguire",
          age: 72,
          weight: 66,
          height: 61.44,
          bloodsugars: [
            {
              value: 89,
              time: "11/22 12:00:20"
            },
            {
              value: 104,
              time: "12/13 09:53:57"
            },
            {
              value: 100,
              time: "12/13 10:24:02"
            },
            {
              value: 102,
              time: "12/12 01:29:38"
            },
            {
              value: 104,
              time: "12/08 07:16:21"
            },
            {
              value: 80,
              time: "12/26 07:44:18"
            },
            {
              value: 99,
              time: "12/21 12:49:04"
            },
            {
              value: 91,
              time: "12/01 05:36:21"
            },
            {
              value: 105,
              time: "12/19 01:17:25"
            }
          ]
        },
        {
          value: false,
          id: 5,
          name: "Paul Watson",
          age: 23,
          weight: 24,
          height: 59.58,
          bloodsugars: [
            {
              value: 96,
              time: "12/13 04:02:20"
            },
            {
              value: 96,
              time: "12/26 04:58:19"
            },
            {
              value: 75,
              time: "12/12 04:16:00"
            },
            {
              value: 80,
              time: "12/05 05:35:08"
            },
            {
              value: 98,
              time: "11/24 01:56:01"
            },
            {
              value: 83,
              time: "12/05 10:19:18"
            },
            {
              value: 104,
              time: "12/17 05:57:27"
            },
            {
              value: 86,
              time: "12/01 08:19:39"
            },
            {
              value: 103,
              time: "12/15 04:49:34"
            }
          ]
        },
        {
          value: false,
          id: 6,
          name: "Fernandez Matthews",
          age: 49,
          weight: 51,
          height: 70.76,
          bloodsugars: [
            {
              value: 96,
              time: "12/21 05:14:04"
            },
            {
              value: 94,
              time: "11/22 08:42:01"
            },
            {
              value: 76,
              time: "12/26 05:25:51"
            },
            {
              value: 83,
              time: "12/08 11:33:56"
            },
            {
              value: 93,
              time: "12/24 07:16:02"
            },
            {
              value: 86,
              time: "11/21 11:55:26"
            },
            {
              value: 89,
              time: "11/23 02:08:45"
            },
            {
              value: 99,
              time: "12/05 03:45:01"
            },
            {
              value: 97,
              time: "12/23 08:05:11"
            }
          ]
        },
        {
          value: false,
          id: 7,
          name: "Lindsay Long",
          age: 76,
          weight: 75,
          height: 62.65,
          bloodsugars: [
            {
              value: 98,
              time: "12/03 08:29:15"
            },
            {
              value: 105,
              time: "12/15 12:26:06"
            },
            {
              value: 91,
              time: "11/25 11:34:06"
            },
            {
              value: 100,
              time: "12/20 09:00:24"
            },
            {
              value: 89,
              time: "12/05 08:38:34"
            },
            {
              value: 76,
              time: "12/26 02:37:50"
            },
            {
              value: 84,
              time: "12/22 03:41:40"
            },
            {
              value: 85,
              time: "12/07 09:34:51"
            },
            {
              value: 78,
              time: "11/24 10:50:34"
            }
          ]
        }
      ]
    }
  }
}

</script>

