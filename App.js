import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "./Header";
import MainView from "./MainView";

export default class App extends React.Component {
  // state 배열에 계속 추가되는 n개의 Task 저장
  state = {
    todos: [],
  };

  // 할 일 추가
  addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    this.setState((prevState) => ({
      todos: [
        newTodo, // new task
        ...prevState.todos, // 기존 task
      ],
    }));
  };

  // 할 일 완료
  checkTodo = (id) => { // id 넘김
    this.setState((prevState) => {
      const [todo] = prevState.todos.filter((e) => e.id === id); // 클릭한(event) id와 등록된 id의 타입과 이름 모두 일치하면
      todo.completed = !todo.completed;
      return {
        todos: [...prevState.todos],
      };
    });
  };

  // 할 일 삭제
  removeTodo = (id) => {
    this.setState((prevState) => {
      const index = prevState.todos.findIndex((e) => e.id === id);
      prevState.todos.splice(index, 1);
      return {
        todos: [...prevState.todos],
      };
    });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>
        <Header addTodo={this.addTodo} />
        <MainView
        todos={this.state.todos}
        // TypeError: _this.props.checkTodo is not a function. 오류해결
        // TypeError: _this.props.removeTodo is not a function. 오류해결
        checkTodo={this.checkTodo}
        removeTodo={this.removeTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8DAEA",
    flexDirection: "column",
    maxWidth: "100%",
    paddingTop: 50,
  },

  title: {
    fontWeight: "800",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
  },
});
