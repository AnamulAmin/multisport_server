const result = await OrderModel.aggregate([
  {
    $match: {
      createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) },
    },
  },
  {
    $facet: {
      orders: [{ $skip: (page - 1) * limit }, { $limit: limit }],
      totalCount: [{ $count: "totalItems" }],
      totalOrderPricesByStatus: [
        { $group: { _id: "$status", totalTk: { $sum: "$total" } } },
      ],
    },
  },
]);
