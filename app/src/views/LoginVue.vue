<template>
    <div class="login-section">
        <h1 class="title">Login</h1>
        <form>
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import { ref } from 'vue';
    let email = ref('');
    let password = ref('');



</script>