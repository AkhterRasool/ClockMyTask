import {
    cleanup,
    findAllByRole,
    findAllByText,
    queryAllByRole,
    queryAllByText,
    render,
    screen, waitFor
} from '@testing-library/react'
import {describe, expect, it} from "vitest";
import App from "../src/App";
import {userEvent} from "@testing-library/user-event";

describe("App", () => {

    it('Should render text field to add tasks when user visits', async () => {
        render(<App/>)

        const inputField = screen.getByRole("textbox")
        const addButton = screen.getByRole("button", {name: 'Add Task'})
        const tasksAdded = screen.getByRole("list")

        expect(inputField).toBeTruthy()
        expect(addButton).toBeTruthy()
        expect(tasksAdded.childNodes).toHaveLength(0)
        expect(screen.queryAllByRole('listitem')).toHaveLength(0)

        cleanup()
    });

    it('Should not create a task when inputField is empty', async () => {
        const uEvent = userEvent.setup()
        render(<App/>)

        const inputField = screen.getByRole("textbox")
        expect(inputField).toBeTruthy()

        const addButton = screen.getByRole("button")
        await uEvent.click(addButton)

        const tasksAdded = screen.queryAllByRole('listitem')
        expect(tasksAdded).toHaveLength(0)

        cleanup()
    });

    it('Should create a new task and start timer.', async () => {
        const uEvent = userEvent.setup()
        render(<App/>)

        const inputField = screen.getByPlaceholderText("Enter task name here.")
        const addButton = screen.getByRole("button")
        await uEvent.type(inputField, 'Shopping')
        await uEvent.click(addButton)

        const tasksAdded = screen.getAllByRole('listitem')
        expect(tasksAdded).toHaveLength(1)

        const shoppingTask = tasksAdded[0]
        findAllByText(shoppingTask, 'Shopping').then(task => expect(task[0].innerHTML).toBe("Shopping"));
        findAllByRole(shoppingTask, 'button').then(task => expect(task[0].innerHTML.trim()).toBe('Pause'));

        await waitFor(() => {
            expect(shoppingTask.firstChild.childNodes[2].textContent).toBe('1s')
            expect(queryAllByRole(shoppingTask, 'button')[0].innerHTML.trim()).toBe('Pause')
            assertTaskLengthToBe(1)
        }, {interval: 1000})

        cleanup()
    });


    it('Should raise an error if task already exists.', async () => {
        const uEvent = userEvent.setup()
        render(<App/>)

        const inputField = screen.getByRole("textbox")
        const addButton = screen.getByRole("button")
        await uEvent.type(inputField, 'Shopping')
        await uEvent.click(addButton)

        const tasksAdded = screen.getAllByRole('listitem')
        expect(tasksAdded.length).toBe(1)

        const shoppingTask = tasksAdded[0]
        findAllByText(shoppingTask, 'Shopping').then(task => expect(task[0].innerHTML).toBe("Shopping"));
        findAllByRole(shoppingTask, 'button').then(task => expect(task[0].innerHTML.trim()).toBe('Pause'));

        await uEvent.type(inputField, 'Shopping')
        await uEvent.click(addButton)
        const s = screen.getByText(/Task 'Shopping' is already created./)
        expect(s.innerHTML).toBe("Task 'Shopping' is already created.");

        cleanup()
    });

    it('Should resume/pause a task timer when space bar is pressed', {timeout: 10000}, async () => {
        const uEvent = userEvent.setup()
        render(<App/>)

        const inputField = screen.getByRole("textbox")
        const addButton = screen.getByRole("button")
        await uEvent.type(inputField, 'Shopping')
        await uEvent.click(addButton)

        assertTaskLengthToBe(1)

        const tasksAdded = screen.getAllByRole('listitem')
        const shoppingTask = tasksAdded[0]
        expect(queryAllByText(shoppingTask, 'Shopping')[0].innerHTML).toBe('Shopping')
        expect(queryAllByRole(shoppingTask, 'button')[0].innerHTML.trim()).toBe('Pause')

        //Pause a task
        const pauseTimerEvent = userEvent.setup({delay: 2000})
        await pauseTimerEvent.keyboard("[Space]")
        expect(shoppingTask.firstChild.childNodes[2].textContent).toBe('2s')
        expect(queryAllByRole(shoppingTask, 'button')[0].innerHTML.trim()).toBe('Resume')
        assertTaskLengthToBe(1)

        //Resume the same task
        await uEvent.keyboard("[Space]")
        await waitFor(() => {
            expect(shoppingTask.firstChild.childNodes[2].textContent).toBe('3s')
            expect(queryAllByRole(shoppingTask, 'button')[0].innerHTML.trim()).toBe('Pause')
            assertTaskLengthToBe(1)
        }, {interval: 1000})

        cleanup()
    });

    it('Interact and control 2 tasks using arrow keys ', {timeout: 10000}, async () => {
        const uEvent = userEvent.setup()
        render(<App/>)

        const tasks = ['Shopping', 'Studying']
        const firstTask = tasks[0]
        const secondTask = tasks[1]

        const inputField = screen.getByRole("textbox")
        const addButton = screen.getByRole("button")

        //Add first task and make necessary assertions
        await uEvent.type(inputField, firstTask)
        await uEvent.keyboard("[Enter]")
        assertTaskLengthToBe(1)
        let tasksAdded = screen.getAllByRole('listitem')
        const firstTaskListElement = tasksAdded[0];
        expect(queryAllByText(firstTaskListElement, firstTask)[0].innerHTML).toBe(firstTask)
        expect(queryAllByRole(firstTaskListElement, 'button')[0].innerHTML.trim()).toBe('Pause')
        expect(firstTaskListElement.className).toBe('active-task focused-task')

        //Add second task and make necessary assertions
        await uEvent.type(inputField, secondTask)
        await uEvent.click(addButton)
        tasksAdded = screen.getAllByRole('listitem')
        const secondTaskListElement = tasksAdded[1];
        expect(queryAllByText(secondTaskListElement, secondTask)[0].innerHTML).toBe(secondTask)
        expect(queryAllByRole(secondTaskListElement, 'button')[0].innerHTML.trim()).toBe('Pause')
        expect(queryAllByRole(firstTaskListElement, 'button')[0].innerHTML.trim()).toBe('Resume')
        expect(firstTaskListElement.className).toBe('')
        expect(secondTaskListElement.className).toBe('active-task focused-task')


        //Pause second task
        const pauseTimerEvent = userEvent.setup({delay: 2000})
        await pauseTimerEvent.keyboard("[Space]")
        expect(secondTaskListElement.firstChild.childNodes[2].textContent).toBe('2s')
        expect(queryAllByRole(secondTaskListElement, 'button')[0].innerHTML.trim()).toBe('Resume')
        expect(queryAllByRole(firstTaskListElement, 'button')[0].innerHTML.trim()).toBe('Resume')
        expect(firstTaskListElement.className).toBe('')
        expect(secondTaskListElement.className).toBe(' focused-task')

        //Navigate using arrow keys
        await uEvent.keyboard("[ArrowUp]")
        expect(secondTaskListElement.className).toBe('')
        expect(firstTaskListElement.className).toBe(' focused-task')

        await uEvent.keyboard("[ArrowDown]")
        expect(firstTaskListElement.className).toBe('')
        expect(secondTaskListElement.className).toBe(' focused-task')

        //Resume the first task
        await uEvent.keyboard("[ArrowUp]")
        await uEvent.keyboard("[Space]")
        await waitFor(() => {
            expect(firstTaskListElement.firstChild.childNodes[2].textContent).toBe('1s')
            expect(queryAllByRole(firstTaskListElement, 'button')[0].innerHTML.trim()).toBe('Pause')
            assertTaskLengthToBe(2)
        }, {interval: 1000})

        //Now resume the second task
        await uEvent.keyboard("[ArrowDown]")
        await uEvent.keyboard("[Space]")
        await waitFor(() => {
            expect(secondTaskListElement.firstChild.childNodes[2].textContent).toBe('3s')
            expect(queryAllByRole(secondTaskListElement, 'button')[0].innerHTML.trim()).toBe('Pause')

            //assert for first task if it has been paused
            expect(firstTaskListElement.firstChild.childNodes[2].textContent).toBe('1s')
            expect(queryAllByRole(firstTaskListElement, 'button')[0].innerHTML.trim()).toBe('Resume')
            assertTaskLengthToBe(2)
        }, {timeout: 1500})

        cleanup()
    });

    const assertTaskLengthToBe = (taskLength: number) => {
        const tasksAdded = screen.getAllByRole('listitem')
        expect(tasksAdded.length).toBe(taskLength)
    }
})

