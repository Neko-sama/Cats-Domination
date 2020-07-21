
function hex_distance(a, b){
    return (Math.abs(a.axialx - b.axialx)
          + Math.abs(a.axialx + a.axialy - b.axialx - b.axialy)
          + Math.abs(a.axialy - b.axialy)) / 2
}

function hex_directionBetween(a, b){
  if(b.axialx==a.axialx&&b.axialy<a.axialy)
    return 1;
  if(b.axialx>a.axialx&&b.axialy<a.axialy)
    return 2;
  if(b.axialx>a.axialx&&b.axialy==a.axialy)
    return 3;
  if(b.axialx==a.axialx&&b.axialy>a.axialy)
    return 4;
  if(b.axialx<a.axialx&&b.axialy>a.axialy)
    return 5;
  if(b.axialx<a.axialx&&b.axialy==a.axialy)
    return 6;
}

// function pathfinding(){
//   frontier = PriorityQueue();
//   frontier.put(start, 0);
//   came_from = {};
//   cost_so_far = {};
//   came_from[start] = None;
//   cost_so_far[start] = 0;
//
//   while not frontier.empty(){
//     current = frontier.get()
//
//     if current == goal:
//     break
//
//     for (var i=0;i<6;i++){
//       next=hex_neighbor(current,i);
//       new_cost = cost_so_far[current] + graph.cost(current, next);
//       if next not in cost_so_far or new_cost < cost_so_far[next]{
//         cost_so_far[next] = new_cost;
//         priority = new_cost + hex_distance(goal, next);
//         frontier.put(next, priority);
//         came_from[next] = current;
//       }
//     }
//   }
// }



// function hex_neighbor(hex, direction){
//     var dir = hex_direction(direction)
//     return {x:(hex.x + dir.x),(hex.y + dir.y)}
// }
