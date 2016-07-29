import sequelize from '../../model';

export default function blog() {
  return new Promise((resolve, reject) => {
    let queryParams = {
      order: '"createdAt" DESC'
    };
    sequelize.post.findAll(queryParams).then(data => {
      resolve(data.map(node => { return {
        title: node.dataValues.title,
        subtitle: node.dataValues.subtitle,
        id: node.dataValues.id,
        content: node.dataValues.content.substring(0,150)
      }}));
    }).catch(reject);
  });
}
