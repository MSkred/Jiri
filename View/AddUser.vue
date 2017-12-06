<template>
  <div>
      <div class="container">
      <h1>Ajouter un utilisateur</h1>
        <form action="">
            <div class="form-group">
                <label for="name">Prénom et nom</label>
                <input type="text" id="name" name="name" placeholder="Écrivez le prénom et nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Écrivez l'adresse mail" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Écrivez le mot de passe" class="form-control">
            </div>
            <div class="form-group">
                <label for="company">Entreprise</label>
                <input type="text" id="company" name="company" placeholder="Écrivez l'entreprise" class="form-control">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Créer un utilisateur</button>
            </div>
        </form>
      </div>
  </div>
</template>
<script>
export default {
  name: 'add-user',
}
</script>
