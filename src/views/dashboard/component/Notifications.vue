<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Subscribers"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Subscribers"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              P256dh
            </th>
            <th class="primary--text">
              Auth
            </th>
            <th class="primary--text">
              Endpoint
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(subscriber, index) in subscribers"
            :key="index"
          >
            <td>{{ subscriber._id }}</td>
            <td>{{ subscriber.p256dh }}</td>
            <td>{{ subscriber.auth }}</td>
            <td>{{ subscriber.endpoint }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'DashboardNotifications',
    data: () => ({
    }),
    computed: {
      ...mapGetters({
        subscribers: 'subscribers',
      }),
    },
    async created () {
      await this.setSubscribers()

      console.log(this.subscribers)
    },
    methods: {
      ...mapActions([
        'setSubscribers',
      ]),
    },
  }
</script>

<style>
  td {
    max-width: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
