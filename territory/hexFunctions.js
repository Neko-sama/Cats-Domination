
function hex_distance(a, b){
    return (Math.abs(a.x - b.x)
          + Math.abs(a.x + a.y - b.x - b.y)
          + Math.abs(a.y - b.y)) / 2
}

function hex_directionBetween(a, b){
  if(b.x==a.x&&b.y<a.y)
    return 1;
  if(b.x>a.x&&b.y<a.y)
    return 2;
  if(b.x>a.x&&b.y==a.y)
    return 3;
  if(b.x==a.x&&b.y>a.y)
    return 4;
  if(b.x<a.x&&b.y>a.y)
    return 5;
  if(b.x<a.x&&b.y==a.y)
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

var hex_directions = {
  1:{x:+1,y: 0}, 2:{x:+1,y:-1}, 3:{x: 0,y:-1},
  4:{x:-1,y: 0}, 5:{x:-1,y:+1}, 6:{x: 0,y:+1}
}


function hex_neighbor(hex, direction){
  var dir = hex_directions[direction];
  var x = hex.x + dir.x;
  var y = hex.y + dir.y;
  if(map[x] != null && map[x][y] != null)
    return map[x][y];
  else {
    return null;
  }
}
