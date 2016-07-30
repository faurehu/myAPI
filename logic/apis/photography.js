import sequelize from '../../model';


export default function photo() {
  return new Promise((resolve, reject) => {
    let queryParams = {
      limit: 15
    };
    sequelize.Image.findAll(queryParams).then(data => {
      resolve(data.map(node => node.dataValues))
    }).catch(reject);
  });
}
