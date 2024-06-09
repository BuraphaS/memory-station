<template>
  <div>
    <div
      v-if="isAverage"
      class="rateAverage">
      <input type="radio" :id="`avstar5-`+ props.id" :name="'avrate'+ props.id" value="5" v-model="props.value" disabled/>
      <label :for="`avstar5-`+ props.id" title="5 stars">5 stars</label>
      <input type="radio" :id="`avstar4-`+ props.id" :name="'avrate'+ props.id" value="4" v-model="props.value" disabled/>
      <label :for="`avstar4-`+ props.id" title="4 stars">4 stars</label>
      <input type="radio" :id="`avstar3-`+ props.id" :name="'avrate'+ props.id" value="3" v-model="props.value" disabled/>
      <label :for="`avstar3-`+ props.id" title="3 stars">3 stars</label>
      <input type="radio" :id="`avstar2-`+ props.id" :name="'avrate'+ props.id" value="2" v-model="props.value" disabled/>
      <label :for="`avstar2-`+ props.id" title="2 stars">2 stars</label>
      <input type="radio" :id="`avstar1-`+ props.id" :name="'avrate'+ props.id" value="1" v-model="props.value" disabled/>
      <label :for="`avstar1-`+ props.id" title="1 star">1 star</label>
    </div>
    <div
      v-else
      class="rate">
      <input type="radio" :id="`star5-`+ props.id" :name="'rate'+ props.id" value="5" v-model="rating" @input="updateRating($event)" />
      <label :for="`star5-`+ props.id" title="5 stars">5 stars</label>
      <input type="radio" :id="`star4-`+ props.id" :name="'rate'+ props.id" value="4" v-model="rating" @input="updateRating($event)" />
      <label :for="`star4-`+ props.id" title="4 stars">4 stars</label>
      <input type="radio" :id="`star3-`+ props.id" :name="'rate'+ props.id" value="3" v-model="rating" @input="updateRating($event)" />
      <label :for="`star3-`+ props.id" title="3 stars">3 stars</label>
      <input type="radio" :id="`star2-`+ props.id" :name="'rate'+ props.id" value="2" v-model="rating" @input="updateRating($event)" />
      <label :for="`star2-`+ props.id" title="2 stars">2 stars</label>
      <input type="radio" :id="`star1-`+ props.id" :name="'rate'+ props.id" value="1" v-model="rating" @input="updateRating($event)" />
      <label :for="`star1-`+ props.id" title="1 star">1 star</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
  value: any
  id: any
  isAverage: any
}
const props = defineProps<IProps>()
const rating = ref(0)
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const emit = defineEmits(['rating']);

const fetchRating = async () => {
  try {
    const { data, error } = await supabase
      .from('rating')
      .select('rating')
      .eq('postId', props.id)
      .eq('uid', user.value.id)
      .single();
    if (error && error.details.includes('row')) {
      console.log('No existing rating found, ready to send new rating.');
    } else if (data) {
      rating.value = data.rating
    } else {
      console.error('Error fetching rating:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
const updateRating = async (event: any) => {
  try {
    const { data, error } = await supabase
      .from('rating')
      .select('rating')
      .eq('postId', props.id)
      .eq('uid', user.value.id)
      .single();

    if (error && error.details.includes('row')) {
      await sendRating(event.target._value);
    } else if (data) {
      await modifyRating(event.target._value);
    } else {
      console.error('Error determining whether to send or update rating:', error);
    }

    emit('rating', rating.value);
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('Event value:', event.target.value);
  console.log('Rating:', rating.value);

  
}
const sendRating = async (event: any) => {
  try {
    const { error } = await supabase
      .from('rating')
      .insert({
        rating: event,
        uid: user.value.id,
        postId: props.id,
      } as never);
    if (error) {
      console.error('Error sending rating:', error);
    } else {
      await fetchRating()
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
const modifyRating = async (event: any) => {
  try {
    const { error } = await supabase
      .from('rating')
      .update({
        rating: event,
      })
      .eq('uid', user.value.id)
      .eq('postId', props.id);
    if (error) {
      console.error('Error updating rating:', error);
    } else {
      await fetchRating()
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
onMounted(async ()=>{
  rating.value = props.value
  await fetchRating()
})
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.rate {
  float: left;
  height: 46px;
  padding: 0 10px;
}

.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}

.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}

.rate:not(:checked) > label:before {
  content: '★ ';
}

.rate > input:checked ~ label {
  color: #ffc700;
}

.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}

.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}


.rateAverage {
  float: left;
  height: 28px;
  padding: 0 10px;
}

.rateAverage:not(:checked) > input {
  position: absolute;
  top: -9999px;
}

.rateAverage:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  font-size: 15px;
  color: #ccc;
}

.rateAverage:not(:checked) > label:before {
  content: '★ ';
}

.rateAverage > input:checked ~ label {
  color: #ffc700;
}

</style>