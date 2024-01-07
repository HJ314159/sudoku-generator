import numpy as np
import time

def display_menu():
    while True:
        print("Welcome to sudoku.py, please view the list of commands below.")
        print("1. Solve a 9x9 sudoku puzzle.")
        print("2. Generate a 9x9 sudoku puzzle. [COMING SOON]")
        print("3. Timer.")
        user_choice_input = input("Please enter the command of which you would like to execute: ")
        if not user_choice_input.isdigit():
            print("Invalid input. Please enter a valid integer.")
            continue

        user_choice = int(user_choice_input)

        try:
            if user_choice == 1:
                board_input = input("Please input the board as a list of lists: ")
                board = eval(board_input)
                solve(board)
            elif user_choice == 2:
                print("Please come back later.")
                # generate()
            elif user_choice == 3:
                stopwatch()
            else:
                print("Invalid input. Please enter a number from the list of commands.")
        except ValueError:
            print("Invalid input. Please enter a valid input for the chosen command.")

def possible(y, x, n, board):
    for i in range(0, 9):
        if board[y][i] == n:
            return False
    for i in range(0, 9):
        if board[i][x] == n:
            return False
    x0 = (x // 3) * 3
    y0 = (y // 3) * 3
    for i in range(0, 3):
        for j in range(0, 3):
            if board[y0 + i][x0 + j] == n:
                return False
    return True

def solve(board):
    for y in range(9):
        for x in range(9):
            if board[y][x] == 0:
                for n in range(1, 10):
                    if possible(y, x, n, board):
                        board[y][x] = n
                        solve(board)
                        board[y][x] = 0
                return
    print("The answer is", np.matrix(board))
    while True:
        user_input = input("If you would like to return to the main menu, enter 1")
        try:
            if int(user_input) == 1:
                break
        except:
            print("Invalid input. Please enter 1 to return to the main menu.")

def generate(board):
    global new_grid
    new_grid = [[0 for i in range(9)] for j in range(9)]
    for y in range(9):
        current_num = 1
        for x in range(9):
            if board[y][x] == 0 and valid(y, x, current_num):
                new_grid[y][x] = current_num
        current_num += 1
    print(np.matrix(new_grid))

# def generate():
#     global new_grid
#     a = 1
#     new_grid = [[0 for i in range(9)] for j in range(9)]
#     for y in range(9):
#         for x in range(9):
#             for n in range(1, 10):
#                 if a <= 9:
#                     if valid(y, x ,n):
#                         new_grid[y][x] = n
#                         a += 1
#                         generate()
#                         new_grid[y][x] = 0  
#                 return
#     print(np.matrix(new_grid))

def valid(y, x, n):
    global new_grid
    for i in range(0, 9):
        if new_grid[y][i] == n:
            return False
    for i in range(0, 9):
        if new_grid[i][x] == n:
            return False
    x0 = (x // 3) * 3
    y0 = (y // 3) * 3
    for i in range(0, 3):
        for j in range(0, 3):
            if new_grid[y0 + i][x0 + j] == n:
                return False
    return True

new_grid = []

start_time = 0
end_time = 0
elapsed_time = 0

def start_stopwatch():
    global start_time
    start_time = time.time()

def stop_stopwatch():
    global end_time
    end_time = time.time()

def reset_stopwatch():
    global start_time, end_time, elapsed_time
    start_time = 0
    end_time = 0
    elapsed_time = 0

def calculated_elapsed_time():
    global elapsed_time
    elapsed_time = end_time - start_time
    return elapsed_time


def stopwatch():
    global elapsed_time

    stop = False
    start_stopwatch()

    if not stop:
        while True:
            user_input = input("Enter 1 to stop the stopwatch: ")
            try:
                if int(user_input) == 1:
                    stop_stopwatch()
                    elapsed_time = calculated_elapsed_time()
                    print(f"Elapsed Time: {elapsed_time} seconds")
                    break
            except ValueError:
                print("Invalid input. Please enter 1 to stop the stopwatch.")

        user_input = input("Press 1 to return to the main menu: ")
        try:
            if int(user_input) == 1:
                display_menu()
        except ValueError:
            print("Invalid input. Returning to the main menu.")
            display_menu()

display_menu()
    #[3, 0, 0, 2],
    #[0, 4, 1, 0],
    #[0, 3, 2, 0],
    #[4, 0, 0, 1]

    #[3, 1, 4, 2],
    #[2, 4, 1, 3],
    #[1, 3, 2, 4],
    #[4, 2, 3, 1]

    # Example Usage:    
    # [5, 3, 0, 0, 7, 0, 0, 0, 0],
    # [6, 0, 0, 1, 9, 5, 0, 0, 0],
    # [0, 9, 8, 0, 0, 0, 0, 6, 0],
    # [8, 0, 0, 0, 6, 0, 0, 0, 3],
    # [4, 0, 0, 8, 0, 3, 0, 0, 1],
    # [7, 0, 0, 0, 2, 0, 0, 0, 6],
    # [0, 6, 0, 0, 0, 0, 2, 8, 0],
    # [0, 0, 0, 4, 1, 9, 0, 0, 5],
    # [0, 0, 0, 0, 8, 0, 0, 7, 9]

    # [5, 3, 0, 0, 7, 0, 0, 0, 0],
    # [6, 0, 0, 1, 9, 5, 0, 0, 0],
    # [0, 9, 8, 0, 0, 0, 0, 6, 0],
    # [8, 0, 0, 0, 6, 0, 0, 0, 3],
    # [4, 0, 0, 8, 0, 3, 0, 0, 1],
    # [7, 0, 0, 0, 2, 0, 0, 0, 6],
    # [0, 6, 0, 0, 0, 0, 2, 8, 0],
    # [0, 0, 0, 4, 1, 9, 0, 0, 5],
    # [0, 0, 0, 0, 8, 0, 0, 7, 9]

    # [[0, 0, 5, 3, 2, 0 , 0 , 7, 0],[7, 0, 0, 0, 0, 0, 0, 0, 4], [1, 0, 0, 0, 5, 0, 0, 0, 0],[4, 0, 0, 2, 0, 0, 0, 0, 9], [6, 0, 7, 4, 0, 9, 1, 0, 2], [5, 0, 0, 0, 0, 6, 0, 0, 3], [ 0, 0, 0, 0, 1, 0, 0, 0, 5], [8, 0, 0, 0, 0, 0, 0, 0, 7], [0, 9, 0, 0, 6, 7, 4, 0, 0]]

    #[[0, 0, 3, 0, 0, 0, 2, 9, 0],[0, 6, 0, 9, 8, 0, 0, 4, 3],[4, 9, 0, 0, 3, 1, 0, 0, 6],[9, 0, 7, 0, 1, 0, 8, 6, 0],[0, 0, 0, 9, 8, 0, 0, 0, 0],[0, 0, 5, 4, 0, 7, 1, 0, 9],[6, 0, 4, 0, 0, 3, 9, 0, 5],[5, 0, 1, 4, 9, 6, 7, 2, 0],[2, 0, 9, 0, 5, 6, 0, 3, 8]]