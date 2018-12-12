<template>
    <!-- <tr>
        <td>
            <div class="event_widget-info">
                <div class="event_widget-img">
                    <figure class="image image is-32x32">
                        <img :src="widgetevent.feature_image" alt="Placeholder image">
                    </figure>
                </div>
                <div class="event_widget-name">
                    <p class="title is-6"><router-link :to="'/events/' + widgetevent.id">{{ widgetevent.base_title }}</router-link></p>
                </div>
            </div>
        </td>
        <td><p class="subtitle is-6">{{ widgetevent.event_date | formatDate }}</p></td>
        <td><p>{{ widgetevent.location }}</p></td>
    </tr> -->
    <div class="card widget-event">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="widgetevent.feature_image" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-5"><router-link :to="'/events/' + widgetevent.id">{{ widgetevent.base_title }}</router-link></p>
            <p class="subtitle is-6">{{ widgetevent.event_date | formatDate }}</p>

            <div class="content">
                <p>{{ widgetevent.location }}</p>.
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  name: "EventWidget",
  props: ["widgetevent"],
  filters: {
    formatDate(value) {
      if (!value) return "";
      return moment(String(value)).format("MM/DD/YYYY");
    }
  }
};
</script>

<style>
    .event_widget-info {
        display: flex;
        align-items: center;
    }
    .event_widget-img {
        margin-right: 1rem;
    }
</style>