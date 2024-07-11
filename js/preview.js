const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview-pic');
const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const avatarFile = avatarChooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const avatarMatches = FILE_TYPES.some((it) => avatarFileName.endsWith(it));

  if (avatarMatches) {
    avatarPreview.src = URL.createObjectURL(avatarFile);
  }
});

photoChooser.addEventListener('change', () => {
  const photoFile = photoChooser.files[0];
  const photoFileName = photoFile.name.toLowerCase();

  const photoMatches = FILE_TYPES.some((it) => photoFileName.endsWith(it));

  if (photoMatches) {
    const photoUrl = URL.createObjectURL(photoFile);
    photoPreview.style.backgroundImage = `url('${photoUrl}')`;
    photoPreview.style.backgroundSize = 'contain';
    photoPreview.style.backgroundRepeat = 'no-repeat';
    photoPreview.style.backgroundPosition = 'center';
  }
});
