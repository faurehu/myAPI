import sequelize from '../../model';

export default function blog() {
  return new Promise((resolve, reject) => {
    let queryParams = {
      order: '"createdAt" DESC'
    };
    sequelize.post.findAll(queryParams).then(data => {
      resolve(data.map(node => node.dataValues));
    }).catch(reject);
  });
}
